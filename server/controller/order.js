const { errHandler, successHandler, permisHandler, existHandler } = require("../response");
const { Product, Category, Career, User, Order } = require("./../model");
const { sendmailWithAttachments } = require("./sendmail");
const shortid = require("shortid");
const mongoose = require("mongoose");
const qs = require("query-string");
const crypto = require("crypto");
const { ResponseCode } = require("../common/ResponseCode");
const { list_files } = require("../contants/File");
const { uniqBy } = require("lodash");
const PAGE_SIZE = 10;

// Get getOrdersFromUser

// const url =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3001/user/result?"
//     : "https://app.thanhlapcongtyonline.vn/user/result?";

exports.getOrdersFromUser = async (req, res) => {
  try {
    let _order = await Order.find({ orderOwner: req.id })
      .populate("products", "name type")
      .populate("orderOwner", "name")
      .sort("-createdAt");
    // console.log(_order);
    return successHandler(_order, res);
  } catch (err) {
    console.log("getOrdersFromUser error");
    return errHandler(err, res);
  }
};

// admin
exports.getOrders = async (req, res) => {
  try {
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
        .populate("products", "name")
        .populate("orderOwner", "name email")
        .skip(current_page)
        .limit(PAGE_SIZE)
        .sort("-createdAt");

      const count = await Order.find({
        $or: newCondition.length > 0 ? newCondition : [{}],
      }).countDocuments();

      return successHandler({ _order, count, current_page: page || 1 }, res);
    }
    return getOrder(req, res);
  } catch (err) {
    console.log("getOrders error");
    return errHandler(err, res);
  }
};

const getOrder = async (req, res) => {
  try {
    let _order = await Order.find({ orderOwner: req.id })
      .populate("products", "name")
      .populate("orderOwner", "name")
      // .limit(10)
      .sort("-createdAt");

    return successHandler(_order, res);
  } catch (err) {
    console.log("getOrder error");
    return errHandler(err, res);
  }
};

exports.getOrderBySlug = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.role === "admin") {
      const _order = await Order.findById(id).populate("products", "name type");

      return successHandler(_order, res);
    }

    return permisHandler(res);
  } catch (err) {
    console.log("getOrderBySlug error");

    return errHandler(err, res);
  }
};

exports.createOrders = async (req, res) => {
  try {
    //  khai báo
    const { track, payment, data, categories } = req.body;

    const { selectProduct, selectChildProduct } = data;

    let newData = {
      track,
      payment,
      data,
      categories,
      orderOwner: req.id,
      name: shortid.generate(),
      products: selectChildProduct ? selectChildProduct : selectProduct,
    };

    let files = findKeysByObject(data, list_files).flat();

    newData.files =  uniqBy(files, "name").filter((item) => item);;

    // Handle Calculate Price with multi Product

    let price = 0;

    // Push Multi Product

    if (selectChildProduct) {
      // By child product
      // price += await calcPrice(selectChildProduct);
    }

    if (selectProduct) {
      // By Category product
      price += await calcPrice(selectProduct);
    }

    newData.price = price;

    newData.slug = newData.name + "-" + shortid.generate();

    let _save = new Order({ ...newData });

    let _obj = await _save.save();

    return successHandler(_obj, res);
  } catch (err) {
    console.log("createOrders error");
    return errHandler(err, res);
  }
};

exports.orderWithPayment = async (req, res) => {
  // const session = await mongoose.startSession();
  try {
    let exist = await Order.findOne({ orderId: req.body.orderId }); // findOne.length > 0 => exist || valid

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
      // price += await calcPrice(selectChildProduct);
    }

    if (selectProduct) {
      // By Category product
      price += await calcPrice(selectProduct);
    }

    let files = findKeysByObject(data, list_files).flat();

    newData.files = uniqBy(files, "name").filter((item) => item);

    newData.price = price;

    newData.slug = newData.name + "-" + shortid.generate();

    let _save = new Order({ ...newData });

    let _obj = await _save.save();

    // handle Payment Here
    let params = {
      amount: price * 100,
      orderInfo: _obj._id,
      orderId: req.body.orderId,
      createDate: req.body.createDate,
    };

    return paymentOrder(req, res, params);
  } catch (err) {
    console.log("orderWithPayment error");
    return errHandler(err, res);
  }
};

exports.getUrlReturn = async (req, res) => {
  // console.log(req.query, " Get URL Return");
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
  
  let url =  process.env.NODE_ENV === "development" ? `http://localhost:3000/user/result?` : `https://app.thanhlapcongtyonline.vn/user/result?`

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    let code = vnp_Params["vnp_ResponseCode"];
    const query = qs.stringify({
      code,
      text: ResponseCode[code],
    });

    if (code === "00") {
      // Success
      const _update = {
        payment: Number(1),
      };

      await Order.updateOne({ _id: req.query.vnp_OrderInfo }, _update, { new: true });

      // console.log("getUrlReturn updated Success");

      let _order = await Order.findOne({ _id: req.query.vnp_OrderInfo }).populate("orderOwner", "_id name email");

      // console.log(_order);

      let params = {
        email: _order.orderOwner.email,
        subject: "Thanh toán thành công",
        content: `Chào ${_order?.orderOwner?.name},<br />
        Quý khách đã thanh toán thành công.
        Thông tin giấy tờ sẽ được gửi sớm nhất có thể, quý khách vui lòng đợi trong giây lát.
        <br/> Xin cảm ơn`,
        type: "any",
      };
      await sendmailWithAttachments(req, res, params);

      return res.redirect(url + query);
    }
    return res.redirect(url + query);
  } else {
    const query = qs.stringify({
      code: ResponseCode[97],
    });
    return res.redirect(url + query);
  }
};

const paymentOrder = (req, res, params) => {
  let { createDate, orderId, amount, orderInfo } = params;

  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = process.env.TMN_CODE_VPN;

  var secretKey = process.env.SECRET_KEY_VPN;

  var vnpUrl = process.env.VNPAY_URL;



  var returnUrl =process.env.NODE_ENV === 'DEV' ? 'http://localhost:3001/api/order/payment/url_return': process.env.RETURN_URL;

  var orderType = req?.body?.orderType || "billpayment";

  var locale = (Boolean(req.body?.language) && req.body?.language) || "vn";

  var vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: "VND",
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

  var hmac = crypto.createHmac("sha512", secretKey);

  var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;

  vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

  return res.status(200).json({ status: 200, url: vnpUrl });
};

// common
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

const findKeysByObject = (obj, listfiles) => {
  if (!obj) return;
  let files;
  // console.log("findKeysByObject", files, obj);
  for (let prop in obj) {
    // prop => create_company || change_info || pending || disolution
    if (listfiles[prop]) {
      files = Object.keys(obj[prop]).map((key) => {
        if (obj[prop][key]) {
          if (typeof listfiles[prop][key] === "object" && !Array.isArray(listfiles[prop][key])) {
            // Check listfiles must be a Object
            if (obj[prop][key].present_person) {
              let person = obj[prop][key].present_person;
              return listfiles[prop][key][person];
            } else {
              return listfiles[prop][key].personal;
            }
          } else return listfiles[prop][key];
        }
      });
    }
  }
  return files;
};
