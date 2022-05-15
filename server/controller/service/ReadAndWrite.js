const { Order, Setting } = require("../../model");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const expressions = require("angular-expressions");

const moment = require("moment");
const assign = require("lodash/assign");

const libre = require("libreoffice-convert");

const { sendmailWithAttachments } = require("../sendmail");

libre.convertAsync = require("util").promisify(libre.convert);

expressions.filters.lower = function (input) {
  // This condition should be used to make sure that if your input is
  // undefined, your output will be undefined as well and will not
  // throw an error
  if (!input) return input;
  return input.toLowerCase();
};
expressions.filters.upper = function (input) {
  // This condition should be used to make sure that if your input is
  // undefined, your output will be undefined as well and will not
  // throw an error
  if (!input) return input;
  return input.toUpperCase();
};
function angularParser(tag) {
  tag = tag.replace(/^\.$/, "this").replace(/(’|‘)/g, "'").replace(/(“|”)/g, '"');
  const expr = expressions.compile(tag);
  return {
    get: function (scope, context) {
      let obj = {};
      const scopeList = context.scopeList;
      const num = context.num;
      for (let i = 0, len = num + 1; i < len; i++) {
        obj = assign(obj, scopeList[i]);
      }
      return expr(scope, obj);
    },
  };
}

exports.checkingOrder = async (req, res) => {
  try {
    // let _order = await Order.findOne({ $and: [{ payment: 1, send: 0 }] }).populate("orderOwner", "email");
    let _order = await Order.findOne({ _id: "6280b57551647d589c92fe93" }).populate("orderOwner", "email");

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

    let _setting = await Setting.find().populate("mailRegister mailPayment"); // -> _setting
    let mailParams;
    if (_setting) {
      let { mailPayment } = _setting[0];
      let { subject, content } = mailPayment;
      mailParams = {
        email: order.orderOwner.email,
        subject,
        content,
        removeFiles: true,
        send: 1,
        _id: order._id,
        type: "path",
      };
    } else {
      mailParams = {
        email: "handgod1995@gmail.com",
        subject: "Testing auto generate files",
        content: "Testing auto generate files",
        removeFiles: true,
        send: 1,
        _id: order.orderOwner._id,
        type: "path",
      };
    }
    if (files) {
      console.log(data);
      let _contentOrder = flattenObject(data);

      for (let file of files) {
        try {
          console.log("comming here", 1);
          let buffer = await applyContent(file, _contentOrder);
          // let docxFile = await saveFileAsDocx(buffer, ".docx"); // docx input

          // const docxBuf = await fs.readFileSync(docxFile);
          console.log("comming here", 2);

          let ext = ".pdf";

          // let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);

          let pdfBuf = await libre.convertAsync(buffer, ext, undefined);

          let filepath = await saveFileAsDocx(pdfBuf, ext); // docx input

          attachments.push({ filepath, name: file.name });

          // fs.unlinkSync(docxFile);
        } catch (err) {
          return res.status(400).json({
            error: err,
          });
        }
        // Here in done you have pdf file which you can save or transfer in another stream
      }
      mailParams.filesPath = attachments;

      return await sendmailWithAttachments(req, res, mailParams);

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

  // const options = {
  //   parser: function (tag) {
  //     // tag can be "user[lower]", "user", or "user[upper]"
  //     const lowerRegex = /\[lower\]$/;
  //     const upperRegex = /\[upper\]$/;
  //     let changeCase = "";
  //     if (lowerRegex.test(tag)) {
  //       changeCase = "lower";
  //       // transform tag from "user[lower]" to "user"
  //       tag = tag.replace(lowerRegex, "");
  //     }
  //     if (upperRegex.test(tag)) {
  //       changeCase = "upper";
  //       // transform tag from "user[upper]" to "user"
  //       tag = tag.replace(upperRegex, "");
  //     }
  //     return {
  //       get: function (scope) {
  //         let result = null;
  //         // scope will be {user: "John"}
  //         if (tag === ".") {
  //           result = scope;
  //         } else {
  //           // Here we use the property "user" of the object {user: "John"}
  //           result = scope[tag];
  //         }

  //         if (typeof result === "string") {
  //           if (changeCase === "upper") {
  //             return result.toUpperCase();
  //           } else if (changeCase === "lower") {
  //             return result.toLowerCase();
  //           }
  //         }
  //         return result;
  //       },
  //     };
  //   },
  //   paragraphLoop: true,
  //   linebreaks: true,
  // };
  console.log("comming here", 1);
  const doc = new Docxtemplater(zip, { parser: angularParser });

  doc.render(data);

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
  // handle Change Info Array;

  for (let props in _template) {
    console.log("props", props);
    if (
      props === "change_info_transfer_contract_A_side_owner" &&
      _template.change_info_transfer_contract_A_side_owner === "personal"
    ) {
      let {
        change_info_transfer_contract_A_side_personal_name: name,
        change_info_transfer_contract_A_side_personal_birth_day: birth_day,
        change_info_transfer_contract_A_side_personal_doc_type: doc_type,
        change_info_transfer_contract_A_side_personal_doc_code: doc_code,
        change_info_transfer_contract_A_side_personal_doc_time_provide: doc_time_provide,
        change_info_transfer_contract_A_side_personal_doc_place_provide: doc_place_provide,
        change_info_transfer_contract_A_side_personal_contact_address: contact_address,
      } = _template;
      _template.A_type = [
        {
          name,
          birth_day,
          doc_type,
          doc_code,
          doc_time_provide,
          doc_place_provide,
          contact_address,
        },
      ];
    }
  }
  return _template;
};

const objToKeys = (obj, baseObj, path = null) => {
  const regex = /(?=.*\d[\s\S][-T:.Z])\w+/g;

  Object.keys(obj).forEach((item) => {
    // item => dissolution , uy_quyen, pending, .... 1st

    // item => cancel, approve .... 2nd;

    // item => fields

    let newPath = path ? [path, item].join("_") : item;

    // Valid Item

    if (obj[item]) {
      // String || Number || Date

      if (typeof obj[item] !== "object") {
        // console.log("fieldName", newPath, "data display", obj[item]);
        console.log("\x1b[32m", "fieldName");
        console.log(newPath);
        console.log("\x1b[36m", "data Display");
        console.log(obj[item]);

        if (typeof obj[item] === "string" && obj[item].match(regex)) {
          // Type DATE
          baseObj[newPath] = moment(obj[item]).format("DD/MM/YYYY"); // Date Time convert
        } else {
          // Type String || Number
          baseObj[newPath] = obj[item]; // create exist value for Number || String field
        }
      } else if (obj[item].length > 0) {
        // Handle with Array
        baseObj[newPath] = obj[item].map((elmt, i) => ({ ...elmt, index: `${i + 1}` }));
      } else {
        // Handle with object
        objToKeys(obj[item], baseObj, newPath);
      }
    } else {
      // Undefined || Null
      baseObj[newPath] = "";
    }
  });
};
