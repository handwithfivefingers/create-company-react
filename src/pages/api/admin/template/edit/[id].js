import connectDB from "@/config/connectDB";
import {
  authenticated,
  authFailedHandler,
  errHandler,
  existHandler,
  successHandler,
  updatedHandler,
} from "@/api/authenticate";
import { TemplateMail } from "@/server/models";

const secret = process.env.SECRET;

connectDB();
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await editTemplate(req, res);
    // case "GET":
    //   return await getOrders(req, res);
  }
}
const admin = "admin";

const editTemplate = authenticated(async (req, res) => {
  let { id } = req.query;
  console.log(id);
  let _update = {
    name: req.body.name,
    content: req.body.content,
    subject: req.body.subject,
  };

  let _updated = await TemplateMail.updateOne({ _id: id }, _update, { new: true });

  try {
    return updatedHandler(_updated, res);
  } catch (e) {
    return errHandler(e, res);
  }
}, admin);
