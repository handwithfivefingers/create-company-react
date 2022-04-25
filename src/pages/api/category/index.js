import { authenticated } from "../authenticate";
import connectDB from "../../../config/connectDB";
import { Category } from "../../../server/models";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return res.status(200).json({ message: "Method doesnt support" });
    case "GET":
      return await getCategories(req, res);
  }
}

// Fetch data
const getCategories = async (req, res) => {
  Category.find({}).exec((err, data) => {
    if (err)
      return res.status(200).json({
        message: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
        status: 400,
        success: false,
      });
    if (data) {
      // console.log(data)
      let newCate = filterCaregories(data);
      return res.status(200).json({
        message: "Success",
        data: newCate,
        status: 200,
        success: true,
      });
    }
  });
};

export const filterCaregories = (categories, parentId = null) => {
  let data = [];
  // categories : [ {_id, price, name, slug, parentId }]
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  // console.log(category)
  for (let cate of category) {
    data.push({
      _id: cate._id,
      name: cate.name,
      price: cate.price,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: filterCaregories(categories, cate._id),
    });
  }
  return data;
};
