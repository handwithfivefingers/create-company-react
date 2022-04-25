import { authenticated, deletedHandler, errHandler } from "@/api/authenticate";
import { Order } from "@/server/models";
const ADMIN = "admin";
export default async (req, res) => {
  switch (req.method) {
    case "POST":
      return await deleteOrders(req, res);
  }
};

const deleteOrders = authenticated(async (req, res) => {
  let { id } = req.query;
  let _deleted = await Order.findOneAndDelete({ _id: id });
  try {
    return deletedHandler(_deleted, res);
  } catch (e) {
    return errHandler(e, res);
  }
}, ADMIN);
