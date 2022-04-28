const { existHandler, successHandler, errHandler } = require("../../response");
const { Order, Product } = require("../../model");
const shortid = require("shortid");
const mongoose = require("mongoose");
const datejs = require("datejs");
const QueryString = require("query-string");
const crypto = require("crypto");

exports.getOrdersFromUser = async (req, res) => {
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

exports.createOrders = async (req, res) => {
  //  khai báo
  const { track, payment, products, data, categories } = req.body;
  var newData = {
    track,
    payment,
    data,
    categories,
    orderOwner: req.id,
    name: shortid.generate(),
  };

  let idArray = [];

  // Handle Calculate Price with multi Product
  let price = await calcPrice(data.selectProduct);

  // Push Multi Product
  if (products) {
    for (let i = 0; i < products.length; i++) {
      idArray.push(mongoose.Types.ObjectId(products[i]));
    }
  } else {
    idArray.push(mongoose.Types.ObjectId(data.selectProduct));
  }

  newData.products = idArray; // List Products
  newData.price = price;
  // newData.orderId = orderId;
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
  let exist = await Order.findOne({ orderId: orderId }); // findOne.length > 0 => exist || valid
  if (exist) return existHandler(res);

  //  khai báo
  const { track, payment, products, data, categories } = req.body;

  var newData = {
    track,
    payment,
    data,
    categories,
    orderOwner: req.id,
    name: shortid.generate(),
  };

  let idArray = [];

  // Handle Calculate Price with multi Product
  let price = await calcPrice(data.selectProduct);

  // Push Multi Product
  if (products) {
    for (let i = 0; i < products.length; i++) {
      idArray.push(mongoose.Types.ObjectId(products[i]));
    }
  } else {
    idArray.push(mongoose.Types.ObjectId(data.selectProduct));
  }

  newData.products = idArray; // List Products
  newData.price = price;
  // newData.orderId = orderId;
  newData.slug = newData.name + "-" + shortid.generate();
  let _save = new Order({ ...newData });
  let _obj = await _save.save();

  // handle Payment Here
  let params = {
    amount: price * 10,
    orderDescription: `Thanh toán đơn hàng ${_obj.name}`,
    orderId: orderId,
    _id: _obj._id,
  };

  paymentOrder(req, res, params);

  try {
    return successHandler(_obj, res);
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
  var returnUrl = `http://localhost:3000/user/order`;

  var date = new Date();
  var createDate = date.toString("yyyymmddHHmmss");
  var orderId = date.toString("HHmmss");

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
    // var date = new Date();
    // var createDate = date.toString("yyyymmddHHmmss");
    // var orderId = date.toString("HHmmss");
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
  // return res.redirect(vnpUrl);
};

const registerCompany = async (data) => {
  //   price, orderOwner, track, payment, product, data, orderId, categories, orderId;
  //   let obj = {
  //     price: data.price,
  //     orderOwner: data.orderOwner,
  //     track: data.track,
  //     payment: data.payment,
  //     product: data.product,
  //     create_company: data.data,
  //     orderId: data.orderId,
  //     categories: data.categories,
  //   };

  //   return "hello";
  let _obj = new Order({ ...data });
  return await _obj.save();
};

const calcPrice = async (productArray) => {
  console.log(productArray);
  if (typeof productArray === "string") {
    let _product = await Product.findOne({ _id: productArray }).select("_id price");
    console.log(_product);
    return _product.price;
  }

  let allProduct = productArray?.map(async (_id) => {
    let _product = await Product.findOne({ _id: _id }).select("_id price");
    return _product;
  });

  return await Promise.all(allProduct)
    .then((res) => res.reduce((prev, current) => (prev += current.price), 0))
    .catch((err) => console.log(err));
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
