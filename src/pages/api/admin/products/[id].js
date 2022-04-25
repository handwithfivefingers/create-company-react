import { authenticated, errHandler, successHandler } from "@/api/authenticate";
import connectDB from "@/config/connectDB";
import { Category, Product } from "@/server/models";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await deleteProduct(req, res);
    case "GET":
      return await getProductByID(req, res);
  }
}

const deleteProduct = authenticated(async (req, res) => {
  const { id } = req.query;
  const _product = await Product.findOneAndDelete({
    slug: id,
  });
  return res.status(200).json({ message: "Xóa sản phẩm thành công", status: 200 });
});

const getProductByID = async (req, res) => {
  const { id } = req.query;
  let _cate;
  let _product;
  try {
    _cate = await Category.findOne({
      slug: id,
    });
  } catch (err) {
    return errHandler(err, res);
  }
  if (_cate) {
    try {
      _product = await Product.find({
        categories: {
          $in: [_cate?._id],
        },
      }).populate("categories");
    } catch (err) {
      return errHandler(err, res);
    }
  } else {
    return errHandler(err, res);
  }

  try {
    let newData = filterData(_product);
    let lastData = filterCaregories(newData);
    return successHandler(lastData, res, _cate);
  } catch (err) {
    return errHandler(err, res);
  }
};

const filterData = (data) => {
  return data.map((item) => ({
    name: item.name,
    price: item.price,
    type: item.type,
    _id: item._id,
    slug: item?.slug,
    categories: item.categories?.length > 0 ? filterData(item.categories) : [],
    parentId: item?.parentId || [],
  }));
};

const filterCaregories = (prevData) => {
  //  { name: 'Công ty cổ phần',
  //   price: 250000,
  //   type: '3',
  //   _id: 61d537411ac9c2296e8bb858,
  //   slug: undefined,
  //   categories: [{"name":"Thành lập doanh nghiệp","price":"500000","type":1,"_id":"62248950c5533d9f6887e85a","slug":"thanh-lap-doanh-nghiep","categories":[],"parentId":[]},{"name":"Thay đổi thông tin","price":"500000","type":2,"_id":"6224bdfbc5533d9f6887e868","slug":"thay-djoi-thong-tin","categories":[],"parentId":[]}],
  //   parentId: []
  // }

  let data = [];

  let parent;
  let children;

  parent = prevData.filter((item) => item.parentId.length == 0);
  children = prevData.filter((item) => item.parentId.join("").length > 0);

  for (let p of parent) {
    data.push({
      name: p.name,
      price: p.price,
      type: p.type,
      _id: p._id,
      slug: p.slug,
      categories: p.categories,
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
    if (child.parentId.includes(item._id)) {
      item.children.push({ ...child });
      return item;
    }
  });
};
