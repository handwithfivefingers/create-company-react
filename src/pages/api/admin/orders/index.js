import connectDB from "../../../../config/connectDB";
import { authenticated, authFailedHandler, errHandler, permisHandler, successHandler } from "../../authenticate";
import { Order, User } from "./../../../../server/models";
import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";
const secret = process.env.SECRET;
const PAGE_SIZE = 10;

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getOrders(req, res);
  }
}

const getOrders = authenticated(async (req, res) => {
  const { page, ...condition } = req.query;
  let current_page = (parseInt(page) - 1) * PAGE_SIZE;

  const email = new RegExp(condition.name, "i");

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
      .populate("opt_career", ["name", "code"])
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
  return permisHandler(res);
});
