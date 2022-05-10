const { removeFile } = require("../../response");
const { Order, Setting } = require("../../model");

const docxConverter = require("docx-pdf");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const cron = require("node-cron");
const { sendmailWithAttachments } = require("../sendmail");
const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

exports.checkingOrder = async (req, res) => {
  try {
    let _order = await Order.findOne({ $and: [{ payment: 1, send: 0 }] });

    // res.sendStatus(200);
    return await convertFile(_order, req, res);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

const convertFile = async (order, req, res) => {
  // handle Single File
  try {
    let { files, data } = order;
    let attachments = [];
    if (files) {
      for (let file of files) {
        try {
          let buffer = await applyContent(file, data);
          let docxFile = await saveFileAsDocx(buffer, ".docx"); // docx input

          const docxBuf = await fs.readFileSync(docxFile);

          let ext = ".pdf";

          let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

          let filepath = await saveFileAsDocx(pdfBuf, ext); // docx input
          attachments.push({ filepath, name: file.name });
          fs.unlinkSync(docxFile);
        } catch (err) {
          return res.status(400).json({
            error: err,
          });
        }
        // Here in done you have pdf file which you can save or transfer in another stream
      }
      let _setting = await Setting.find().populate("mailRegister mailPayment");
      if (_setting) {
        let { mailPayment } = _setting[0];
        let { subject, content } = mailPayment;
        return await sendmailWithAttachments(req, res, {
          email: "handgod1995@gmail.com",
          subject,
          content,
          filesPath: attachments,
          removeFiles: true,
          type: "path",
        });
      } else {
        return await sendmailWithAttachments(req, res, {
          email: "handgod1995@gmail.com",
          subject: "Testing auto generate files",
          content: "Testing auto generate files",
          filesPath: attachments,
          removeFiles: true,
          type: "path",
        });
      }

      // return res.status(200).json({ message: "ok" });
    }

    return res.status(400).json({
      error: "Files not found",
    });
  } catch (err) {
    console.log("error here");
    return res.status(400).json({
      error: err,
    });
  }
};

const applyContent = async (file = null, data = null) => {
  const content = await fs.readFileSync(path.resolve(path.join(global.__basedir, "/uploads/", file.path)), "binary");

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  let flatOrder = flattenObject(data);

  doc.render(flatOrder);

  return doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });
};

const saveFileAsDocx = async (buffer, ext) => {
  let filePath = path.join(global.__basedir, "/uploads", `${shortid.generate()}-output${ext}`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};

const flattenObject = (data) => {
  const _template = {};
  objToKeys(data, _template);
  const date = new Date();
  _template.date = date.getDate();
  _template.month = date.getMonth();

  return _template;
};

const objToKeys = (obj, baseObj, path = null) => {
  Object.keys(obj).forEach((item) => {
    // item => dissolution , uy_quyen, pending, .... 1st
    // item => cancel, approve .... 2nd;
    // item => fields
    if (obj[item]) {
      let newPath = path ? [path, item].join("_") : item;
      console.log(newPath, obj[item]);

      if (typeof obj[item] !== "object") {
        baseObj[newPath] = obj[item]; // create exist value for Number || String field
      } else if (obj[item].length > 0) {
        // Handle with Array
        baseObj[newPath] = obj[item].map((elmt, i) => ({ ...elmt, index: `${i + 1}` }));
      } else {
        // Handle with object
        objToKeys(obj[item], baseObj, newPath);
      }
    }
  });
};
