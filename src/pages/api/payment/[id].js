import { paymentOrder } from ".";
import { Company } from "./../../../server/models";
import { Product } from "./../../../server/models";
import { authenticated } from "../authenticate";
import dateFormat from "dateformat";

export default async function handler(req, res) {
  let { id } = req.query;
  if (req.method === "GET") {
    return await createPayment(req, res);
  }
  // id -> id thanh toán
}

const createPayment = authenticated(async (req, res) => {
  let { id } = req.query;
  console.log(id);
  const _com = await Company.findOne({ _id: id })
    .populate("productId")
    .exec(async (err, data) => {
      var date = new Date();
      var createDate = dateFormat(date, "yyyymmddHHmmss");
      var orderId = dateFormat(date, "HHmmss");
      let params = {
        amount: data.productId.price,
        orderDescription: `Thanh toán đơn hàng ${data.productId.name}`,
        orderId: orderId,
        _id: data._id,
      };
      return await handleSetOrderId(req, res, params);
    });
});

const handleSetOrderId = async (req, res, params) => {
  const _com = await Company.findOnupdateOneeAndUpdate(
    { _id: params._id },
    {
      orderId: params.orderId,
    },
    { new: true },
  );
  console.log("UPDATEDDDDDDDDDD", _com);
  return await paymentOrder(req, res, params);
};
