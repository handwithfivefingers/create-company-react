const dateFormat = require("date-format");
const { errHandler, successHandler, permisHandler, existHandler } = require("../response");
const { Product, Category, Career, User, Order } = require("./../model");

const shortid = require("shortid");
const mongoose = require("mongoose");
const qs = require("query-string");
const crypto = require("crypto");

const PAGE_SIZE = 10;
// admin
exports.getOrders = async (req, res) => {
  const { page, ...condition } = req.body;
  let current_page = (parseInt(page) - 1) * PAGE_SIZE;

  const email = new RegExp(condition?.name, "i");

  let _user = await User.find({
    $and: [
      {
        email: email,
        // role: "User",
      },
    ],
  }).select("_id");

  let newCondition = _user.map((item) => ({ orderOwner: item._id }));

  if (req.role === "admin") {
    let _order = await Order.find({
      $or: newCondition.length > 0 ? newCondition : [{}],
    })
      .populate("main_career", ["name", "code"])
      // .populate("opt_career", ["name", "code"])
      .populate("products", "name")
      .populate({
        path: "orderOwner",
        select: "name email",
      })
      .skip(current_page)
      .limit(PAGE_SIZE)
      .sort("-createdAt");

    const count = await Order.find({
      $or: newCondition.length > 0 ? newCondition : [{}],
    }).count();

    try {
      return successHandler({ _order, count, current_page: page || 1 }, res);
    } catch (err) {
      return errHandler(err, res);
    }
  }
  if (req.role === "user") {
    return getOrder(req, res);
  }
  return permisHandler(res);
};

const getOrder = async (req, res) => {
  let _order = await Order.find({ orderOwner: req.user })
    .populate("products", "name")
    .populate("main_career", "name")
    .populate("orderOwner", "name")
    // .limit(10)
    .sort("-createdAt");
  try {
    return successHandler(_order, res);
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.getOrderBySlug = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (req.role === "admin") {
    const _order = await Order.findById(id)
      .populate("products", "name type")
      .populate("data.create_company.main_career", ["name", "code"]);
    // .populate("data.create_company.opt_career", ["name", "code"]);
    // console.log(_order);
    try {
      return successHandler(_order, res);
    } catch (err) {
      return errHandler(err, res);
    }
  }
  return permisHandler(res);
};

exports.createOrders = async (req, res) => {
  //  khai báo
  const { track, payment, data, categories } = req.body;
  const { selectProduct, selectChildProduct } = data;
  var newData = {
    track,
    payment,
    data,
    categories,
    orderOwner: req.id,
    name: shortid.generate(),
    products: selectChildProduct ? selectChildProduct : selectProduct,
  };

  // Handle Calculate Price with multi Product

  let price = 0;

  // Push Multi Product

  if (selectChildProduct) {
    // By child product
    price += await calcPrice(selectChildProduct);
  }

  if (selectProduct) {
    // By Category product
    price += await calcPrice(selectProduct);
  }

  newData.price = price;

  newData.slug = newData.name + "-" + shortid.generate();

  let _save = new Order({ ...newData });
  let _obj = await _save.save();

  try {
    return successHandler(_obj, res);
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.orderWithPayment = async (req, res) => {
  var date = new Date();
  var orderId = date.toString("HHmmss");

  // const session = await mongoose.startSession();

  let exist = await Order.findOne({ orderId: orderId }); // findOne.length > 0 => exist || valid
  if (exist) return existHandler(res);

  //  khai báo
  const { track, payment, data, categories } = req.body;
  const { selectProduct, selectChildProduct } = data;
  var newData = {
    track,
    payment,
    data,
    categories,
    orderOwner: req.id,
    name: shortid.generate(),
    products: selectChildProduct ? selectChildProduct : selectProduct,
  };

  let price = 0;

  // Handle Calculate Price with multi Product

  if (selectChildProduct) {
    // By child product
    price += await calcPrice(selectChildProduct);
  }

  if (selectProduct) {
    // By Category product
    price += await calcPrice(selectProduct);
  }

  newData.price = price;

  newData.slug = newData.name + "-" + shortid.generate();

  let _save = new Order({ ...newData });

  let _obj = await _save.save();

  // handle Payment Here
  let params = {
    amount: price * 10,
    orderDescription: `Thanh toán đơn hàng ${_obj.name} tại app.thanhlapcongtyonline.vn`,
    _id: _obj._id,
  };

  try {
    // return successHandler(_obj, res);
    return paymentOrder(req, res, params);
  } catch (err) {
    return errHandler(err, res);
  }
};

const paymentOrder = (req, res, params = null) => {
  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = "6KGPLEH9";
  var secretKey = "AGYRQMFNZHMFDYBWOVAIBJZMZHZHLDUO";
  var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

  var returnUrl = `http://localhost:3000/order/payment/url_return`;

  var date = new Date();
  var createDate = dateFormat(date, "yyyymmddHHmmss");
  var orderId = dateFormat(date, "HHmmss");
  var orderInfo;
  var amount;
  var bankCode;

  if (params !== null) {
    amount = params?.amount;
    bankCode = params?.bankCode;
    orderInfo = params?.orderDescription;
  } else {
    amount = params?.amount || req.body.amount;
    bankCode = req.body.bankCode;
    orderInfo = params?.orderDescription || req.body.orderDescription;
  }

  var orderType = req?.body?.orderType || "billpayment";
  var locale = req.body?.language || "vn";

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

  vnp_Params = sortObject(vnp_Params);
  var signData = qs.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });
  return res.status(200).json({ status: 200, url: vnpUrl });
};

exports.getUrlReturn = async (req, res) => {
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var tmnCode = "6KGPLEH9";
  var secretKey = "AGYRQMFNZHMFDYBWOVAIBJZMZHZHLDUO";

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

const calcPrice = async (productArray) => {
  if (typeof productArray === "string") {
    let _product = await Product.findOne({ _id: productArray }).select("price");
    return _product.price;
  }

  let allProduct = productArray?.map(async (_id) => {
    let _product = await Product.findOne({ _id: _id }).select("price");
    return _product;
  });

  return await Promise.all(allProduct)
    .then((res) => res.reduce((prev, current) => (prev += current.price), 0))
    .catch((err) => console.log(err));
};
