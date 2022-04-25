import { authenticated, errHandler, successHandler } from "../authenticate";
import connectDB from "../../../config/connectDB";
import { Product } from "../../../server/models";
import slugify from "slugify";
connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createdProduct(req, res);
      break;
    // case "GET":
    //   return await getProduct(req, res);
  }
}
const createdProduct = authenticated(async (req, res) => {
  const obj = {
    name: req.body.name.toString(),
    price: Number(req.body.price),
    slug: slugify(req.body.name),
    categories: req.body.categories,
    type: req.body.type,
  };

  if (req.body.parentId) {
    obj.parentId = req.body.parentId;
  }

  let product = await Product.findOne({
    name: req.body.name,
  });

  if (product) return errHandler(product, res);

  const _product = new Product(obj);

  await _product.save(async (err, data) => {
    if (err) return errHandler(err, res);
    if (data) return successHandler(data, res);
  });
});
