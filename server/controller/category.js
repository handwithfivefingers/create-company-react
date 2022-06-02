const { Product, Category, Career } = require("./../model");
const { errHandler, successHandler } = require("./../response");
// Fetch data
exports.getCategories = async (req, res) => {
  try {
    let _career = await Category.find({});
    let newCate = filterCaregories(_career);
    return successHandler(newCate, res);
  } catch (err) {
    console.log('getCategories error');
    return errHandler(err, res);
  }
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
