import connectDB from "@/config/connectDB";
import {
  authenticated,
  authFailedHandler,
  errHandler,
  existHandler,
  successHandler,
  createdHandler,
} from "@/api/authenticate";
import { TemplateMail } from "@/server/models";

const secret = process.env.SECRET;

connectDB();
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await createTemplate(req, res);
    // case "GET":
    //   return await getOrders(req, res);
  }
}
const admin = "admin";

const createTemplate = authenticated(async (req, res) => {
  let _exist = await TemplateMail.findOne({ name: req.body.name });

  if (_exist) {
    try {
      return existHandler(res);
    } catch (e) {
      return errHandler(e, res);
    }
  }

  let _template = new TemplateMail({
    name: req.body.name,
    content: req.body.content,
    subject: req.body.subject,
  });

  let _save = await _template.save();

  if (_save) {
    try {
      return createdHandler(_save, res);
    } catch (e) {
      return errHandler(e, res);
    }
  }

  return errHandler(_, res);
}, admin);
