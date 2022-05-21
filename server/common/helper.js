const path = require("path");
const fs = require("fs");
const PizZip = require("pizzip");

const expressions = require("angular-expressions");

const Docxtemplater = require("docxtemplater");

const shortid = require("shortid");

const { assign, last } = require("lodash");

const libre = require("libreoffice-convert");

require("datejs");

libre.convertAsync = require("util").promisify(libre.convert);

expressions.filters.lower = function (input) {
  if (!input) return input;
  return input.toLowerCase();
};

expressions.filters.upper = function (input) {
  if (!input) return input;
  return input.toUpperCase();
};

function angularParser(tag) {
  tag = tag.replace(/^\.$/, "this").replace(/(’|‘)/g, "'").replace(/(“|”)/g, '"');
  const expr = expressions.compile(tag);

  return {
    get: function (scope, context) {
      let obj = {};
      const index = last(context.scopePathItem);
      const scopeList = context.scopeList;
      const num = context.num;
      for (let i = 0, len = num + 1; i < len; i++) {
        obj = assign(obj, scopeList[i]);
      }
      obj = assign(obj, { $index: index });
      return expr(scope, obj);
    },
  };
}

const applyContent = async (file = null, data = null) => {
  let dirname = global.__basedir;

  let filePath = path.resolve(path.join(dirname, "/uploads/", file.path));

  const content = fs.readFileSync(filePath, "binary");

  const zip = new PizZip(content);

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

const specialFields = ["company_main_career", "company_opt_career"];

const dateFields = ["doc_time_provide", "birth_day"];

const objToKeys = (obj, baseObj, path = null) => {
  const regex = /(?=.*\d[\s\S][-T:.Z])\w+/g;

  Object.keys(obj).forEach((item) => {
    let isSpecial = specialFields.some((elmt) => elmt === item);

    let isDate = dateFields.some((elmt) => elmt === item);

    // item => dissolution , uy_quyen, pending, .... 1st

    // item => cancel, approve .... 2nd;

    // item => fields

    let newPath = path ? [path, item].join("_") : item;

    // Valid Item

    if (obj[item]) {
      // String || Number || Date

      if (typeof obj[item] !== "object") {
        // console.log("\x1b[32m", "fieldName");
        // console.log(newPath);
        // console.log("\x1b[36m", "data Display");
        // console.log(obj[item]);

        if (typeof obj[item] === "string" && isDate) {
          // Type DATE
          baseObj[newPath] = dateConvert(obj[item]); // Date Time convert
        } else {
          // Type String || Number
          baseObj[newPath] = obj[item]; // create exist value for Number || String field
        }
      } else if (obj[item].length > 0) {
        // Handle with Array
        baseObj[newPath] = obj[item].map((elmt, i) => ({ ...elmt, index: `${i + 1}` }));
      } else {
        // Handle with object
        if (isSpecial) {
          let { name, code } = obj[item];
          baseObj[newPath] = { name, code };
        } else objToKeys(obj[item], baseObj, newPath);
      }
    }
  });
};

const dateConvert = (dateString) => {
  //   return Date.parse(dateString).toString("dd/mm/yyyy");
  //   Date.i18n.setLanguage("vi-VN");
  //   console.log(Date);
  return Date.parse(dateString).toString(`dd/MM/yyyy`);
};

exports.flattenObject = (data) => {
  const _template = {};
  objToKeys(data, _template);
  const date = new Date();
  _template.date = date.getDate();
  _template.month = date.getMonth() + 1; // Month start at 0 -> 11
  _template.year = date.getFullYear();
  // handle Change Info Array;

  for (let props in _template) {
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
    if (props === "create_company_approve_legal_respon") {
      _template.legal_respon = _template[props].map((item) => ({
        ...item,
        birth_day: dateConvert(item.birth_day),
        doc_time_provide: dateConvert(item.doc_time_provide),
        title_type: item.title === "Chủ tịch công ty" ? 1 : item.title === "Giám đốc" ? 2 : 3,
      }));

      delete _template.create_company_approve_legal_respon;
    }
  }
  return _template;
};

exports.convertFile = async (file, data) => {
  let buffer = await applyContent(file, data);

  let ext = ".pdf";

  let pdfBuf = await libre.convertAsync(buffer, ext, undefined);
  console.log("converting");
  let pdfFile = await saveFileAsDocx(pdfBuf, ext); // docx input
  console.log("saving file");
  return pdfFile;
};
