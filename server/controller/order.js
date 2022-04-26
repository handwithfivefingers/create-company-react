const { errHandler, successHandler, permisHandler } = require("../response");
const { Product, Category, Career, User, Order } = require("./../model");

const PAGE_SIZE = 10;
// admin
exports.getOrders = async (req, res) => {
  const { page, ...condition } = req.query;
  let current_page = (parseInt(page) - 1) * PAGE_SIZE;

  const email = new RegExp(condition.name, "i");

  let _user = await User.find({
    $and: [
      {
        email: email,
        // role: "User",
      },
    ],
  }).select("_id");

  let newCondition = _user.map((item) => ({ orderOwner: item._id }));

  if (req.role === "admin") {
    let _order = await Order.find({
      $or: newCondition.length > 0 ? newCondition : [{}],
    })
      .populate("main_career", ["name", "code"])
      .populate("opt_career", ["name", "code"])
      .populate("products", "name")
      .populate({
        path: "orderOwner",
        select: "name email",
      })
      .skip(current_page)
      .limit(PAGE_SIZE)
      .sort("-createdAt");

    const count = await Order.find({
      $or: newCondition.length > 0 ? newCondition : [{}],
    }).count();

    try {
      return successHandler({ _order, count, current_page: page || 1 }, res);
    } catch (err) {
      return errHandler(err, res);
    }
  }
  if (req.role === "user") {
    return getOrders(req, res);
  }
  return permisHandler(res);
};

const getOrders = async (req, res) => {
  let _order = await Order.find({ orderOwner: req.user })
    .populate("products", "name")
    .populate("main_career", "name")
    .populate("orderOwner", "name")
    // .limit(10)
    .sort("-createdAt");
  try {
    return successHandler(_order, res);
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.getOrderBySlug = async (req, res) => {
  const { id } = req.params;
  if (req.role === "admin") {
    const _order = await Order.findById(id)
      .populate("products", "name type")
      .populate("data.create_company.main_career", ["name", "code"])
      .populate("data.create_company.opt_career", ["name", "code"]);
    // console.log(_order);
    try {
      return successHandler(_order, res);
    } catch (err) {
      return errHandler(err, res);
    }
  }
  return permisHandler(res);
};
