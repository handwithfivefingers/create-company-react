import connectDB from "../../../config/connectDB";
import { authenticated, authFailedHandler, errHandler, successHandler } from "../authenticate";
import { Order } from "./../../../server/models/index.js";

import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

connectDB();
export default async function handler(req, res) {
  switch (req.method) {
    // case 'POST':
    // 	return await getOrders(req, res);
    case "GET":
      return await getOrders(req, res);
  }
}

const getOrders = async (req, res) => {
  const token = await getToken({ req, secret });
  let _order = [];
  if (token) {
    let id = token.sub;
    if (token.role === "admin") {
      _order = await Order.find({})
        .populate("products", "name")
        .populate("main_career", "name")
        .populate("orderOwner", "name")
        .limit(10)
        .sort("-createdOn");
    } else if (token.role === "User") {
      _order = await Order.find({ userOwner: id })
        .populate("products", "name")
        .populate("main_career", "name")
        .populate("orderOwner", "name")
        .limit(10)
        .sort("-createdOn");
    } else {
      return errHandler("", res);
    }

    try {
      return successHandler(_order, res);
    } catch (err) {
      return errHandler(err, res);
    }
  }

  return authFailedHandler(res);
};
