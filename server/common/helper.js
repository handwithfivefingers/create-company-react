const path = require('path');
const fs = require('fs');
const PizZip = require('pizzip');

const expressions = require('angular-expressions');

const Docxtemplater = require('docxtemplater');

const shortid = require('shortid');

const { assign, last } = require('lodash');

const libre = require('libreoffice-convert');

const qs = require('query-string');
const crypto = require('crypto');

require('datejs');

libre.convertAsync = require('util').promisify(libre.convert);

expressions.filters.lower = function (input) {
  if (!input) return input;
  return input.toLowerCase();
};

expressions.filters.upper = function (input) {
  if (!input) return input;
  return input.toUpperCase();
};

expressions.filters.divideBy = function (input, num) {
  if (!input) return input;
  return input / num;
};

function nullGetter(tag, props) {
  if (props.tag === 'simple') {
    return 'undefined';
  }
  if (props.tag === 'raw') {
    return '';
  }
  return '';
}

function angularParser(tag) {
  tag = tag.replace(/^\.$/, 'this').replace(/(’|‘)/g, "'").replace(/(“|”)/g, '"');
  const expr = expressions.compile(tag);
  // expr = expressions.compile(tag);
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

  let filePath = path.resolve(path.join(dirname, '/uploads/', file.path));

  const content = fs.readFileSync(filePath, 'binary');

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    parser: angularParser,
    nullGetter,
  });

  doc.render(data);

  return doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });
};

const saveFileAsDocx = async (buffer, ext) => {
  let filePath = path.join(global.__basedir, '/uploads', `${shortid.generate()}-output${ext}`);
  fs.writeFileSync(filePath, buffer);
  return filePath;
};

const specialFields = ['company_main_career', 'company_opt_career'];

const dateFields = ['doc_time_provide', 'birth_day', 'time_provide', 'start', 'end'];

const objToKeys = (obj, baseObj, path = null) => {
  const regex = /(?=.*\d[\s\S][-T:.Z])\w+/g;

  Object.keys(obj).forEach((item) => {
    let isSpecial = specialFields.some((elmt) => elmt === item);

    let isDate = dateFields.some((elmt) => elmt === item);

    // item => dissolution , uy_quyen, pending, .... 1st

    // item => cancel, approve .... 2nd;

    // item => fields

    let newPath = path ? [path, item].join('_') : item;

    // Valid Item

    if (obj[item]) {
      // String || Number || Date

      if (typeof obj[item] !== 'object') {
        // console.log("\x1b[32m", "fieldName");
        // console.log(newPath);
        // console.log("\x1b[36m", "data Display");
        // console.log(obj[item]);

        if (typeof obj[item] === 'string' && isDate) {
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
  return Date.parse(dateString).toString(`dd/MM/yyyy`);
};

const flattenObject = (data) => {
  const _template = {};
  objToKeys(data, _template);
  const date = new Date();
  _template.date = date.getDate();
  _template.month = date.getMonth() + 1; // Month start at 0 -> 11
  _template.year = date.getFullYear();
  // handle Change Info Array;
  console.log(_template);
  for (let props in _template) {
    if (
      props === 'change_info_transfer_contract_A_side_owner' &&
      _template.change_info_transfer_contract_A_side_owner === 'personal'
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
    if (props === 'create_company_approve_legal_respon') {
      _template.legal_respon = _template[props].map((item) => ({
        ...item,
        birth_day: dateConvert(item.birth_day),
        doc_time_provide: dateConvert(item.doc_time_provide),
        title_type: item.title === 'Chủ tịch công ty' ? 1 : item.title === 'Giám đốc' ? 2 : 3,
      }));

      delete _template.create_company_approve_legal_respon;
    }
    if (props)
      if (props === 'change_info_legal_representative_doc_place_provide') {
        /// Handle create_company_approve_origin_person_doc_type
        // {#doc_type==1}X{/}
        // doc_type == 1 ? 'CMND'
        // doc_type == 2 ? 'CCCD'
        // doc_type == 3 ? Hộ Chiếu
        // doc_type == 4 ? Loại khác ....
        //Channge info
        // Legal Representative
        _template.lr_doc_place_provide = _template[props];
      }
    if (props === 'change_info_legal_representative_new_title') {
      _template.lr_new_title = _template[props];
    }
  }

  return _template;
};

const convertFile = async (file, data) => {
  let buffer = await applyContent(file, data);

  let ext = '.pdf';

  let pdfBuf = await libre.convertAsync(buffer, ext, undefined);
  console.log('converting');
  let pdfFile = await saveFileAsDocx(pdfBuf, ext); // docx input
  console.log('saving file');
  return pdfFile;
};

const removeListFiles = (attachments, path = null) => {
  try {
    for (let attach of attachments) {
      if (path) {
        fs.unlinkSync(attach.path);
      } else if (fs.existsSync(attach.pdfFile)) {
        fs.unlinkSync(attach.pdfFile);
      }
    }
  } catch (err) {
    console.log('removeListFiles error: ' + err);
  }
};
const sortObject = (obj) => {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
};

const getVpnParams = (req, params) => {
  let { createDate, orderId, amount, orderInfo } = params;

  var ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = process.env.TMN_CODE_VPN;

  var secretKey = process.env.SECRET_KEY_VPN;

  var returnUrl =
    process.env.NODE_ENV === 'DEV' ? 'http://localhost:3001/api/order/payment/url_return' : process.env.RETURN_URL;

  var orderType = req?.body?.orderType || 'billpayment';

  var locale = (Boolean(req.body?.language) && req.body?.language) || 'vn';

  var vnp_Params = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: amount,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  vnp_Params = sortObject(vnp_Params);

  var signData = qs.stringify(vnp_Params, { encode: false });

  var hmac = crypto.createHmac('sha512', secretKey);

  var signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest('hex');

  vnp_Params['vnp_SecureHash'] = signed;
  return vnp_Params;
};

module.exports = { sortObject, getVpnParams, flattenObject, convertFile, removeListFiles };
