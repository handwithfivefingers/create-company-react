import dateFormat from "dateformat";
import crypto from "crypto";
import QueryString from "qs";

import { Order } from "./../../../server/models";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await saveOrder(req, res);
    case "POST":
      return await paymentOrder(req, res);
  }
}

export const paymentOrder = (req, res, params = null) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  var tmnCode = "6KGPLEH9";
  var secretKey = "AGYRQMFNZHMFDYBWOVAIBJZMZHZHLDUO";
  var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var returnUrl = `http://localhost:3000/order`;

  var date = new Date();
  var createDate = dateFormat(date, "yyyymmddHHmmss");
  var orderId = dateFormat(date, "HHmmss");

  if (params !== null) {
    var amount = params?.amount;
    var bankCode = params?.bankCode;
    var orderInfo = params?.orderDescription;
    var orderId = params?.orderId;
    // var orderType = params?.orderType;
  } else {
    var amount = params?.amount || req.body.amount;
    var bankCode = params?.bankCode || req.body.bankCode;
    var orderInfo = params?.orderDescription || req.body.orderDescription;
    // var orderType = params?.orderType || req.body.orderType;
    var date = new Date();
    var createDate = dateFormat(date, "yyyymmddHHmmss");
    var orderId = dateFormat(date, "HHmmss");
  }

  var orderType = req.body.orderType;
  var locale = req.body.language;
  if (locale === null || locale === "" || locale !== "undefined") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  // if (bankCode !== null && bankCode !== '' && bankCode !== 'undefined') {
  //       vnp_Params['vnp_BankCode'] = bankCode;
  // }

  vnp_Params = sortObject(vnp_Params);
  var signData = QueryString.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + QueryString.stringify(vnp_Params, { encode: false });
  return res.status(200).json({ status: 200, url: vnpUrl });
};

const saveOrder = async (req, res) => {
  // console.log(req.headers);
  var secretKey = "AGYRQMFNZHMFDYBWOVAIBJZMZHZHLDUO";

  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    // console.log(orderId, rspCode)
    if (orderId) {
      let _com = await Order.findOneAndUpdate(
        {
          orderId: orderId,
        },
        { status: 1 },
        { new: true },
      );
      res.status(200).json({ RspCode: rspCode, Message: "success", data: _com }); // url -> url check || tải về
    }
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
};

function sortObject(obj) {
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
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
