import connectDB from "../../../../config/connectDB";
import { authenticated, authFailedHandler, errHandler, successHandler } from "../../authenticate";
import { Order } from "../../../../server/models/index.js";

const secret = process.env.SECRET;

connectDB();
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getOrders(req, res);
  }
}

const getOrders = authenticated(async (req, res) => {
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
});
