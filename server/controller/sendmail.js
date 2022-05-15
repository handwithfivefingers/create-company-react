const nodeMailer = require("nodemailer");
const shortid = require("shortid");
const fs = require("fs");
const { removeFile, errHandler } = require("../response");
const { TemplateMail, Order } = require("../model");
const { path } = require("path");
const docxConverter = require("docx-pdf");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const { google } = require("googleapis");
const REFRESH_TOKEN =
  "1//04qCUnDYb-Sp0CgYIARAAGAQSNwF-L9IrCAXsz1miKphMYC3JXNrt8fKsRFHv1Ycpw9SdYShYqr_Fa_jvHmhlJcTU3tyU983ByJo";
const REFRESH_URI = "https://developers.google.com/oauthplayground";
const CLIENT_ID = process.env.GG_EMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GG_EMAIL_CLIENT_SECRET;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REFRESH_URI);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.sendmailWithAttachments = async (req, res, { type = "attachments", ...rest }) => {
  const adminEmail = "tbkimt97@gmail.com";
  const adminPass = "Net@Kim!21";
  const mailHost = "smtp.gmail.com";
  const mailPort = "587";

  // const transporter = nodeMailer.createTransport({
  //   host: mailHost,
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     user: adminEmail, //Tài khoản gmail vừa tạo
  //     pass: adminPass, //Mật khẩu tài khoản gmail vừa tạo
  //   },
  //   forceAuth: true,
  // });
  try {
    console.log("setting options");
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: adminEmail,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    if (type === "attachments") {
      let params = {
        adminEmail,
        email: req.body.email,
        subject: req.body.subject,
        content: req.body.content,
        redirect: rest?.redirect,
      };
      return withAttachments(req, res, params, transporter);
    } else if (type === "path") {
      let params = {
        adminEmail,
        email: rest.email,
        subject: rest.subject,
        content: rest.content,
        filesPath: rest.filesPath,
        redirect: rest?.redirect,
        ...rest,
      };
      return withFilesPath(req, res, params, transporter);
    } else if (type === "any") {
      console.log("match params");

      let params = {
        adminEmail,
        email: rest.email,
        subject: rest.subject,
        content: rest.content,
        redirect: rest?.redirect,
        ...rest,
      };
      return sendMail(req, res, params, transporter);
    }
  } catch (err) {
    console.log("error 1", err);
    errHandler(err, res);
  }

  // validate file
};
const withAttachments = async (req, res, { adminEmail, email, subject, content, redirect }, transporter) => {
  let attachments;
  try {
    let validFiles = req.files.some((item) => item.mimetype !== "application/pdf");
    if (validFiles) {
      await req.files.map((file) => removeFile(file.path));
    }
    if (!validFiles) {
      attachments = req.files.map((file) => {
        return { filename: file.originalname, path: file.path };
      });
    }
  } catch (err) {
    res.status(400).json({
      err,
    });
  }

  //sending

  try {
    const resp = await transporter.sendMail({
      from: adminEmail, // sender address
      attachments,
      to: email,
      subject: subject, // Subject line
      html: content, // html body,
    });
    if (redirect) {
      return res.redirect(redirect);
    } else return sendSuccess(resp, res);
  } catch (err) {
    return sendFailed(err, res);
  } finally {
    attachments?.map((item) => removeFile(item.path));
  }
};

const sendMail = async (req, res, { adminEmail, email, subject, content, redirect, ...rest }, transporter) => {
  try {
    console.log("send");
    const resp = await transporter.sendMail({
      from: adminEmail, // sender address
      to: email,
      subject: subject, // Subject line
      html: content, // html body,
    });
    if (redirect) {
      return res.redirect(redirect);
    } else return sendSuccess({ ...resp, role: rest.role }, res);
  } catch (err) {
    console.log("send failed");
    return sendFailed(err, res);
  }
};

const withFilesPath = async (
  req,
  res,
  { adminEmail, email, subject, content, filesPath, redirect, removeFiles, ...rest },
  transporter
) => {
  let attachments = filesPath.map((file) => {
    return { path: file.filepath };
  });
  console.log("sendmail via withFilesPath", attachments);
  try {
    // kích hoạt gửi mail ->
    // gửi client : trong quá trình , vui check mail
    // Thành công, -> gửi mail
    // Thất bại -> báo lỗi

    transporter
      .sendMail({
        from: adminEmail, // sender address
        to: email,
        attachments,
        subject: subject, // Subject line
        html: content, // html body,
      })
      .then(async (info) => {
        if (rest.send === 1) {
          await Order.updateOne({ _id: rest._id }, { send: 1 });
          console.log("updated");
        }
      })
      .catch((err) => {
        console.log("Send mail failed", err);
      })
      .finally(() => {
        for (let attach of attachments) {
          fs.unlinkSync(attach.path);
        }
      });

    res.sendStatus(200);

    // .then(async (info) => {
    //   console.log("send result");
    //   if (rest.send === 1) {
    //     await Order.findOneAndUpdate({ _id: rest._id }, { send: 1 });
    //   }
    //   console.log("updated");
    //   return sendSuccess(info, res);
    // })
    // .catch((err) => {
    //   return sendFailed(err, res);
    // })
  } catch (err) {
    console.log("send mail failed ", err);

    return sendFailed(err, res);
  }
};


const sendFailed = (err, res) => {
  return res.status(200).json({
    message: "Something was wrong",
    error: err,
  });
};

const sendSuccess = (info, res) => {
  return res.status(200).json({
    message: "Sent attachments ok",
    info,
  });
};

const htmlTemplate = async (req) => {
  let _template = await TemplateMail.findById(req.body.id);
  if (_template)
    return {
      subject: _template.subject,
      text: _template.text,
      html: _template.html,
    };

  return {
    subject: "Mail from ThanhlapcongtyOnline ",
    text: "",
    html: "",
  };
};

const saveFileAsDocx = async (buffer) => {
  let filePath = path.join(global.__basedir, "/uploads", `${shortid.generate()}-output.docx`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};
