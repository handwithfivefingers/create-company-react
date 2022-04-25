import connectDB from "../../../../config/connectDB";
import { authenticated, createdHandler, errHandler, existHandler } from "../../authenticate";
import { Category } from "../../../../server/models";
import { getToken } from "next-auth/jwt";
import slugify from "slugify";
const secret = process.env.SECRET;

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await createCategories(req, res);
    case "GET":
      return await getCategories(req, res);
  }
}

const createCategories = async (req, res) => {
  Category.findOne({
    name: req.body.name,
  }).exec((err, data) => {
    if (err) return errHandler(err, res);
    if (data) {
      return existHandler(res);
    } else {
      let obj = {
        name: req.body.name.toString(),
        price: Number(req.body.price),
        slug: slugify(req.body.name)?.toLowerCase(),
        type: req.body.type,
      };
      
      const _obj = new Category(obj);
      _obj.save((err, data) => {
        if (err) {
          return errHandler("Something wents wrong, pls try again", res);
        }
        if (data) {
          return createdHandler(data, res);
        }
      });
    }
  });
};

const getCategories = async (req, res) => {};
