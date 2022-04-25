import connectDB from "../../../../config/connectDB";
import { authenticated, authFailedHandler, errHandler, successHandler } from "../../authenticate";
import { Order } from "../../../../server/models";
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

const getOrders = authenticated(async (req, res) => {
  const { id } = req.query;
  // {
  //   name: 'Truyen Mai',
  //   email: 'truyenmai95@gmail.com',
  //   sub: '61cda65dcc37529c5cb5ffdb',
  //   id: '61cda65dcc37529c5cb5ffdb',
  //   role: 'admin',
  //   iat: 1647229298,
  //   exp: 1649821298,
  //   jti: 'e37a17de-45e2-4fa7-9352-d809a5514c86'
  // }

  if (req.role === "admin") {
    const _order = await Order.findById(id)
      .populate("products", "name type")
      .populate("data.create_company.main_career", ["name", "code"])
      .populate("data.create_company.opt_career", ["name", "code"]);
    // console.log(_order);
    try {
      return successHandler(_order, res);
    } catch (err) {
      return errHandler(err, res);
    }
  }

  return permisHandler(res);
});
