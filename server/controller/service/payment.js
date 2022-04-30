const qs = require("query-string");
const shortid = require("shortid");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { Order } = require("../../model");
const { errHandler } = require("../../response");

exports.handlePayment = async (req, res) => {
  try {
    let _order = await Order.findById(req.body._id);

    if (_order) {
      if (_order.orderId || _order.orderCreated) {
        return res.status(200).json({
          message: "Đơn hàng đã được thanh toán vui lòng thử đơn hàng khác",
        });
      } else {
        var ipAddr =
          req.headers["x-forwarded-for"] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress;

        let tmnCode = process.env.TMN_CODE_VPN;

        let secretKey = process.env.SECRET_KEY_VPN;

        let vnpUrl = process.env.VNPAY_URL;

        let returnUrl = process.env.RETURN_URL;

        let orderInfo = _order._id;

        let { createDate, orderId } = req.body;

        let amount = _order.price;

        let orderType = req?.body?.orderType || "billpayment";

        let locale = req.body?.language || "vn";

        if (locale === null || locale === "" || locale !== "undefined") {
          locale = "vn";
        }

        var vnp_Params = {
          vnp_Version: "2.1.0",
          vnp_Command: "pay",
          vnp_TmnCode: tmnCode,
          vnp_Locale: locale,
          vnp_CurrCode: "VND",
          vnp_TxnRef: orderId,
          vnp_OrderInfo: orderInfo,
          vnp_OrderType: orderType,
          vnp_Amount: amount * 100,
          vnp_ReturnUrl: returnUrl,
          vnp_IpAddr: ipAddr,
          vnp_CreateDate: createDate,
          // vnp_Params['vnp_Merchant'] = ''
        };

        vnp_Params = sortObject(vnp_Params);

        var signData = qs.stringify(vnp_Params, { encode: false });

        var hmac = crypto.createHmac("sha512", secretKey);

        var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

        vnp_Params["vnp_SecureHash"] = signed;

        vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });
        //   res.sendStatus(200);
        return res.status(200).json({ status: 200, url: vnpUrl });
      }
    }
  } catch (err) {
    return errHandler(err, res);
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

exports.getUrlReturn = async (req, res) => {
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var tmnCode = process.env.TMN_CODE_VPN;

  var secretKey = process.env.SECRET_KEY_VPN;

  var signData = qs.stringify(vnp_Params, { encode: false });

  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    const query = qs.stringify({
      code: vnp_Params["vnp_ResponseCode"],
    });

    return res.redirect(`${process.env.BASEHOST}/user/order?` + query);
  } else {
    const query = qs.stringify({
      code: "97",
    });

    return res.redirect(`${process.env.BASEHOST}/admin/order?` + query);
  }
};

exports.checkStatus = async (req, res) => {
  var vnp_Params = req.query;
  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var config = require("config");

  var secretKey = config.get("vnp_HashSecret");

  var querystring = require("qs");

  var signData = querystring.stringify(vnp_Params, { encode: false });

  var crypto = require("crypto");

  var hmac = crypto.createHmac("sha512", secretKey);

  var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    var orderId = vnp_Params["vnp_TxnRef"];
    var rspCode = vnp_Params["vnp_ResponseCode"];
    //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
    res.status(200).json({ RspCode: "00", Message: "success" });
  } else {
    res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  }
};
