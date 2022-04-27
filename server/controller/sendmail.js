const nodeMailer = require("nodemailer");
const shortid = require("shortid");
const fs = require("fs");
const { removeFile } = require("../response");
const { TemplateMail } = require("../model");
const { path } = require("path");
const docxConverter = require("docx-pdf");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");



exports.sendmailWithAttachments = async (req, res) => {
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
  });

  let attachments;
  // validate file
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
      to: req.body.email,
      subject: req.body.subject, // Subject line
      html: req.body.content, // html body,
    });
    return sendSuccess(resp, res);
  } catch (err) {
    return sendFailed(err, res);
  } finally {
    attachments?.map((item) => removeFile(item.path));
  }
};

// exports.handleMailerWithAttachments = async (req, response) => {
//   const adminEmail = "tbkimt97@gmail.com";
//   const adminPass = "Net@Kim!21";
//   const mailHost = "smtp.gmail.com";
//   const mailPort = "587";

//   const transporter = nodeMailer.createTransport({
//     host: mailHost,
//     port: 465,
//     secure: true,
//     auth: {
//       user: adminEmail, //Tài khoản gmail vừa tạo
//       pass: adminPass, //Mật khẩu tài khoản gmail vừa tạo
//     },
//     forceAuth: true,
//     // tls: {
//     //   // do not fail on invalid certs
//     //   rejectUnauthorized: false,
//     // },
//   });

//   let template = {
//     subject: "Created Account Success", // Subject line
//     text: "Created acount successfully", // plain text body
//     html: "Helllo world", // html body
//   };

//   // let htmlContent =
//   // 	'<ul><li> Email:' +( user?.email ||
//   // 	'') + '</li ><li>Password: ' +( user?.password ||
//   // 	'') + '</li></ul>';

//   const form = formidable({
//     multiples: true,
//     uploadDir: __dirname,
//   });
//   // handle check file attach

//   form.parse(req, async (err, fields, files) => {
//     if (err)
//       return response.status(200).json({
//         message: "something was wrong",
//         error: err,
//       });

//     let newFiles;

//     if (files?.attachments?.length > 0) {
//       // files > 1 => Array
//       newFiles = files.attachments;
//     } else {
//       // files <= 1 => Object
//       newFiles = [files.attachments];
//     }

//     let attachFiles =
//       (newFiles.join("").length > 0 &&
//         newFiles?.map((item) => {
//           const data = fs.readFileSync(item.filepath);
//           let filePath = __dirname + "/" + shortid.generate() + "-" + item.originalFilename;
//           fs.writeFileSync(filePath, data);
//           removeFile(item.filepath);
//           return { filepath: filePath, name: item.originalFilename };
//         })) ||
//       null;

//     console.log("await result");

//     transporter
//       .sendMail({
//         from: adminEmail, // sender address
//         to: fields.email,
//         subject: fields.subject, // Subject line
//         // text: 'Created acount successfully', // plain text body
//         html: fields.content, // html body,
//         attachments:
//           attachFiles &&
//           attachFiles?.map((item) => ({
//             filename: item.name,
//             content: fs.createReadStream(item.filepath),
//           })),
//       })
//       .then((info) => {
//         console.log("send result");
//         return sendSuccess(info, response);
//       })
//       .catch((err) => {
//         return sendFailed(err, response);
//       })
//       .finally(() => {
//         attachFiles?.map((item) => removeFile(item.filepath)); // remove all file
//       });
//   });
// };

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

let json = {
  base_val_char: "Sáu trăm triệu",
  base_val_num: 600000000,
  company_core_address: "57/7a DBP",
  company_core_address_opt_1: "",
  company_core_address_opt_2: "",
  company_core_name: "Bàn Tay Group",
  company_core_name_en: "Five Finger",
  company_core_name_vn: "FF",
  company_main_career: "61e6ed293c1c10660de94bf0",
  company_opt_career: [
    {
      code: undefined,
      index: "1",
      name: undefined,
    },
  ],
  company_value: 600000000,
  legal_respon: [
    {
      code: undefined,
      index: "1",
      name: "Mai Văn Truyền",
    },
  ],
  origin_person_doc_code: "12345667",
  origin_person_doc_place_provide: "Quảng ngãi",
  origin_person_doc_time_provide: "2022-01-14T09:30:14.283Z",
  origin_person_doc_type: 4,
  origin_person_name: "Mai Văn Truyền",
  per_main_birth_day: "1995-12-24T03:46:30.325Z",
  per_main_current_address: "Hồ Chí Minh",
  per_main_gender: 1,
  per_main_name: "Mai Văn Truyền",
  per_main_per_type: "Kinh",
  per_main_reg_address: "Daklak",
  present_person: 2,
  productId: "61d454d94d6455805f39ec24",
  selectProduct: "61d454d94d6455805f39ec24",
};

const handlerCronJob = async (req, res) => {
  //   libre.convertAsync = util.promisify(libre.convert);

  let buffer = await applyContent();
  //   // buf is a nodejs Buffer, you can either write it to a file or res.send it with express for example.
  let docxFile = await saveFileAsDocx(buffer);

  //   console.log(docxFile); // filePath;

  let pdfLocation = path.join(__dirname, "/uploads", `${shortid.generate()}-output.pdf`);

  docxConverter(docxFile, pdfLocation, async (err, result) => {
    await removeFile(docxFile);
    if (err) res.status(200).json({ message: "err", err });
    else res.status(200).json({ message: "ok" });
  });
};

const applyContent = async (data = null) => {
  const content = await fs.readFileSync(
    path.resolve(path.join(__dirname, "/public/files/dieulecanhan.docx")),
    "binary",
  );

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(json);

  return doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
};

const saveFileAsDocx = async (buffer) => {
  let filePath = path.join(__dirname, "/uploads", `${shortid.generate()}-output.docx`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};
