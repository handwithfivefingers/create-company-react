const { Product, Category, Career } = require("./../model");
const { errHandler, successHandler } = require("./../response");
// Fetch data
exports.getCategories = async (req, res) => {
  try {
    let _career = await Category.find({});
    // return res.status(200).json({
    //   message: "Success",
    //   data: newCate,
    //   status: 200,
    //   success: true,
    // });
    let newCate = filterCaregories(_career);
    return successHandler(newCate, res);
  } catch (err) {
    return errHandler(err, res);
  }
  // .exec((err, data) => {
  //   if (err)
  //     return res.status(200).json({
  //       message: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
  //       status: 400,
  //       success: false,
  //     });
  //   if (data) {
  //     // console.log(data)
  //

  //   }
  // });
};

const filterCaregories = (categories, parentId = null) => {
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
