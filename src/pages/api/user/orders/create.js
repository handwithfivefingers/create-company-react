import connectDB from "../../../../config/connectDB";
import { authenticated, authFailedHandler, errHandler, existHandler, successHandler } from "../../authenticate";

import { Order, Product } from "../../../../server/models";
import dateFormat from "dateformat";
import shortid from "shortid";
import mongoose from "mongoose";


const secret = process.env.SECRET;

connectDB();
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await createOrders(req, res);
    // case "GET":
    //   return await getOrders(req, res);
  }
}

const createOrders = authenticated(async (req, res) => {
  var date = new Date();
  var orderId = dateFormat(date, "HHmmss");
  let exist = await Order.findOne({ orderId: orderId }); // findOne.length > 0 => exist || valid
  if (exist) return existHandler(err, res);

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

});

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
