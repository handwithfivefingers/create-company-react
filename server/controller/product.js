// import User from "./../model/user";

const { Product, Category } = require("./../model");
const { updatedHandler, errHandler, successHandler } = require("../response");
const lodash = require("lodash");
exports.createProduct = async (req, res) => {
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
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const obj = {
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    categories: req.body.categories,
  };

  if (req.body.parentId) {
    obj.parentId = req.body.parentId;
  }

  //   res.send(200);
  const product = await Product.findOneAndUpdate(
    {
      _id: id,
    },
    obj,
    { new: true }
  );

  return updatedHandler(product, res);
};

exports.fetchProduct = async (req, res) => {
  try {
    let _product = await Product.find({}).populate("categories", "name").populate("parentId", "name");
    let newData = filterData(_product);
    let lastData = filterCaregories(newData);
    return successHandler(lastData, res);
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.query;
  const _product = await Product.findOneAndDelete({
    slug: id,
  });
  return res.status(200).json({ message: "Xóa sản phẩm thành công", status: 200 });
};

const filterData = (data = null) => {
  if (data) {
    return data.map((item) => ({
      name: item.name,
      price: item?.price,
      type: item?.type,
      _id: item?._id,
      slug: item?.slug,
      categories: filterData(item?.categories),
      parentId: item?.parentId || [],
    }));
  } else return null;
};

const filterCaregories = (prevData) => {
  let data = [];

  let parent;
  let children;

  parent = prevData.filter((item) => item.parentId.length == 0);
  children = prevData.filter((item) => item.parentId.length > 0);

  for (let p of parent) {
    data.push({
      name: p?.name,
      price: p?.price,
      type: p?.type,
      _id: p?._id,
      slug: p?.slug,
      categories: p?.categories,
      children: [],
    });
  }

  if (children.length > 0) {
    children.map((child) => {
      const current = handleCheckChildren(child, data);
      data = current;
    });
  }
  return data;
};

const handleCheckChildren = (child, data) => {
  return data.map((item) => {
    if (lodash.some(child.parentId, { _id: item._id })) {
      item.children.push({ ...child });
      return item;
    } else {
      return item;
    }
  });
};
