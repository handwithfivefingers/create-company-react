import connectDB from "../../../../config/connectDB";
import { authenticated, errHandler, successHandler } from "../../authenticate";
import { Category } from "../../../../server/models";
import { getToken } from "next-auth/jwt";
import slugify from "slugify";
const secret = process.env.SECRET;

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getCategories(req, res);
  }
}

const getCategories = async (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err) return errHandler(err, res);
    if (data) return successHandler(data, res);
  });
};
