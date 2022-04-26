// const dateFormat = require("dateformat");

const { existHandler, successHandler, errHandler } = require("../../response");
const { Order, Product } = require("../../model");
const shortid = require("shortid");
const mongoose = require("mongoose");

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
  const dateFormat = require("dateformat");
  var date = new Date();
  var orderId = dateFormat(date, "HHmmss");
  let exist = await Order.findOne({ orderId: orderId }); // findOne.length > 0 => exist || valid
  if (exist) return existHandler(res);

  //  khai báo
  const { track, payment, products, data, categories } = req.body;

  var newData = {
    track,
    payment,
    data,
    categories,
    orderOwner: req.user,
    name: shortid.generate(),
  };

  let idArray = [];

  // Handle Calculate Price with multi Product
  let price = await calcPrice(products);

  // Push Multi Product
  for (let i = 0; i < products.length; i++) {
    idArray.push(mongoose.Types.ObjectId(products[i]));
  }

  newData.products = idArray; // List Products
  newData.price = price;
  newData.orderId = orderId;
  newData.slug = orderId + "-" + shortid.generate();

  let _save = new Order({ ...newData });
  let _obj = await _save.save();

  try {
    return successHandler(_obj, res);
  } catch (err) {
    return errHandler(err, res);
  }
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
  let allProduct = productArray.map(async (_id) => {
    let _product = await Product.findOne({ _id: _id }).select("_id price");
    return _product;
  });
  return await Promise.all(allProduct)
    .then((res) => res.reduce((prev, current) => (prev += current.price), 0))
    .catch((err) => console.log(err));
};
