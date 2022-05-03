import nodeMailer from "nodemailer";
import fs from "fs";
import formidable from "formidable";
import shortid from "shortid";

import { removeFile } from "@/api/authenticate";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default async function handle(req, res) {
  switch (req.method) {
    case "POST":
      return await handleMailerWithAttachments(req, res);
    case "GET":
      return res.status(200).json({
        message: "This METHOD does not support",
      });
  }
}

export const handleMailer = async (user) => {
  const adminEmail = "tbkimt97@gmail.com";
  const adminPass = "Net@Kim!21";
  const mailHost = "smtp.gmail.com";
  const mailPort = "587";

  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    // secure: true,
    auth: {
      user: adminEmail, //Tài khoản gmail vừa tạo
      pass: adminPass, //Mật khẩu tài khoản gmail vừa tạo
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  let htmlContent = "<ul><li> Email:" + user?.email + "</li ><li>Password: " + user?.password + "</li></ul>";

  return await transporter.sendMail({
    from: adminEmail, // sender address
    to: user?.email || "handgod1995@gmail.com", // list of receivers
    subject: "Created Account Success", // Subject line
    text: "Created acount successfully", // plain text body
    html: htmlContent, // html body
  });
};

export const handleMailerWithAttachments = async (req, response) => {
  const adminEmail = "tbkimt97@gmail.com";
  const adminPass = "Net@Kim!21";
  const mailHost = "smtp.gmail.com";
  const mailPort = "587";

  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: 465,
    secure: true,
    auth: {
      user: adminEmail, //Tài khoản gmail vừa tạo
      pass: adminPass, //Mật khẩu tài khoản gmail vừa tạo
    },
    forceAuth: true,
    // tls: {
    //   // do not fail on invalid certs
    //   rejectUnauthorized: false,
    // },
  });

  let template = {
    subject: "Created Account Success", // Subject line
    text: "Created acount successfully", // plain text body
    html: "Helllo world", // html body
  };

  // let htmlContent =
  // 	'<ul><li> Email:' +( user?.email ||
  // 	'') + '</li ><li>Password: ' +( user?.password ||
  // 	'') + '</li></ul>';

  const form = formidable({
    multiples: true,
    uploadDir: __dirname,
  });
  // handle check file attach

  form.parse(req, async (err, fields, files) => {
    if (err)
      return response.status(200).json({
        message: "something was wrong",
        error: err,
      });

    let newFiles;

    if (files?.attachments?.length > 0) {
      // files > 1 => Array
      newFiles = files.attachments;
    } else {
      // files <= 1 => Object
      newFiles = [files.attachments];
    }

    let attachFiles =
      (newFiles.join("").length > 0 &&
        newFiles?.map((item) => {
          const data = fs.readFileSync(item.filepath);
          let filePath = global.__basedir + "/" + shortid.generate() + "-" + item.originalFilename;
          fs.writeFileSync(filePath, data);
          removeFile(item.filepath);
          return { filepath: filePath, name: item.originalFilename };
        })) ||
      null;

    console.log("await result");

    transporter
      .sendMail({
        from: adminEmail, // sender address
        to: fields.email,
        subject: fields.subject, // Subject line
        // text: 'Created acount successfully', // plain text body
        html: fields.content, // html body,
        attachments:
          attachFiles &&
          attachFiles?.map((item) => ({
            filename: item.name,
            content: fs.createReadStream(item.filepath),
          })),
      })
      .then((info) => {
        console.log("send result");
        return sendSuccess(info, response);
      })
      .catch((err) => {
        return sendFailed(err, response);
      })
      .finally(() => {
        attachFiles?.map((item) => removeFile(item.filepath)); // remove all file
      });
  });
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

const htmlTemplate = () => {
  let htmlContent; // Template mail
  return {
    subject: "Created Account Success", // Subject line
    text: "Created acount successfully", // plain text body
    html: "Helllo world", // html body
  };
};
