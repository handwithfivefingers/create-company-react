const dateFormat = require("date-format");
const { errHandler, successHandler, permisHandler, existHandler } = require("../response");
const { Product, Category, Career, User, Order } = require("./../model");

const shortid = require("shortid");
const mongoose = require("mongoose");
const qs = require("query-string");
const crypto = require("crypto");
const { ResponseCode } = require("../common/ResponseCode");
const PAGE_SIZE = 10;
// admin
exports.getOrders = async (req, res) => {
  const { page, ...condition } = req.body;
  let current_page = (parseInt(page) - 1) * PAGE_SIZE;

  const email = new RegExp(condition?.name, "i");

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
      // .populate("opt_career", ["name", "code"])
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

  return getOrder(req, res);
};

const getOrder = async (req, res) => {
  let _order = await Order.find({ orderOwner: req.id })
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
  console.log(id);
  if (req.role === "admin") {
    const _order = await Order.findById(id)
      .populate("products", "name type")
      .populate("data.create_company.main_career", ["name", "code"]);
    // .populate("data.create_company.opt_career", ["name", "code"]);
    // console.log(_order);
    try {
      return successHandler(_order, res);
    } catch (err) {
      return errHandler(err, res);
    }
  }
  return permisHandler(res);
};

exports.createOrders = async (req, res) => {
  //  khai báo
  const { track, payment, data, categories } = req.body;

  const { selectProduct, selectChildProduct } = data;

  const file_contants = {
    // create_company
    create_company_uyquyen: {
      name: "Ủy quyền",
      path: "/files/create_company/create_company_uyquyen.doc",
    },
    create_company_dieuleA: {
      name: "Điều lệ cá nhân",
      path: "/files/create_company/create_company_File_1A_DieuLeCaNhan.docx",
    },
    create_company_dieuleB: {
      name: "Điều lệ tổ chức",
      path: "/files/create_company/create_company_File_1B_DieuLeToChuc.docx",
    },
    create_company_phu_luc_2: {
      name: "Phụ lục I - 2",
      path: "/files/create_company/create_company_File_2_PhuLuc_I_2_GiayDeNghiDangKiMTV.docx",
    },
    create_company_phu_luc_4: {
      name: "Phụ lục I - 10",
      path: "/files/create_company/create_company_File_4_PhuLuc_I_10_DanhSachNguoiDaiDien.docx",
    },

    // change_info
    change_info_hop_dong_chuyen_nhuong: {
      name: "Hợp đồng chuyển nhượng",
      path: "/files/change_info/change_info_File_B_hopdong.docx",
    },
    change_info_quyetdinh: {
      name: "Quyết định",
      path: "/files/change_info/change_info_quyetdinh.docx",
    },
    change_info_phu_luc_2: {
      name: "Đăng kí MTV",
      path: "/files/change_info/change_info_File_2_PhuLuc_I_2_GiayDeNghiDangKiMTV.docx",
    },
    change_info_phu_luc_4: {
      name: "Danh sách người đại diện",
      path: "/files/change_info/change_info_File_4_PhuLuc_I_10_DanhSachNguoiDaiDien.docx",
    },
    change_info_uyquyen: {
      // ??
      name: "Ủy quyền",
      path: "/files/change_info/change_info_uyquyen.doc",
    },

    // pending
    pending_quyetdinh: {
      name: "Quyết định",
      path: "/files/pending/pending_File_1_quyetdinh.docx",
    }, // uy quyen
    pending_uyquyen: {
      name: "Ủy quyền",
      path: "/files/pending/pending_uyquyen.doc",
    }, // uy quyen
    pending_a_b: {
      name: "Phụ lục II - 19",
      path: "/files/pending/pending_File_A_B_Phuluc_II_19.docx",
    }, // phu luc 19

    // giai the
    giai_the_1: {
      name: "Quyết định",
      path: "/files/dissolution/dissolution_File_1_Quyetdinh.docx",
    },
    giai_the_A: {
      name: "A - Phụ lục - 22",
      path: "/files/dissolution/dissolution_File_A_Phuluc_22.docx",
    },
    giai_the_B: {
      name: "A - Phụ lục - 23",
      path: "/files/dissolution/dissolution_File_B_Phuluc_23.docx",
    },
    giai_the_uy_quyen: {
      name: "Ủy quyền",
      path: "/files/dissolution/dissolution_uyquyen.doc",
    },
  };

  const list_files = {
    create_company: {
      approve: {
        personal: [
          file_contants.create_company_dieuleA,
          file_contants.create_company_phu_luc_2,
          file_contants.create_company_uyquyen,
        ],
        organization: [
          file_contants.create_company_dieuleB,
          file_contants.create_company_phu_luc_2,
          file_contants.create_company_uyquyen,
          file_contants.create_company_phu_luc_4,
        ],
      },
    },
    change_info: {
      // Đại diện pháp luật: "Quyết định thay đổi", "Phụ lục II-2", "File_3_UyQuyen.doc",
      legal_representative: [
        file_contants.change_info_quyetdinh,
        file_contants.change_info_phu_luc_2,
        file_contants.change_info_uyquyen,
      ],

      // Người đại diện theo ủy quyền của chủ sở hữu là tổ chức: "Phụ lục II-1","File_3_UyQuyen.doc",
      present_change: [file_contants.phu_luc_1, file_contants.change_info_uyquyen],

      // Địa chỉ trụ sở chính: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
      location: [file_contants.change_info_quyetdinh, file_contants.phu_luc_1, file_contants.change_info_uyquyen],

      // Giảm vốn điều lệ: "Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
      down_authorized_capital: [
        file_contants.change_info_quyetdinh,
        file_contants.phu_luc_1,
        file_contants.change_info_uyquyen,
      ],

      // Chủ sở hữu: "Hợp đồng chuyển nhượng", "Phụ lục II-4","File_3_UyQuyen.doc",
      transfer_contract: [
        file_contants.change_info_hop_dong_chuyen_nhuong,
        file_contants.phu_luc_3,
        file_contants.change_info_uyquyen,
      ],

      // Ngành nghề kinh doanh:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
      company_career: [file_contants.change_info_quyetdinh, file_contants.phu_luc_1, file_contants.change_info_uyquyen],

      // Tăng vốn điều lệ:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
      up_authorized_capital: [
        file_contants.change_info_quyetdinh,
        file_contants.phu_luc_1,
        file_contants.change_info_uyquyen,
      ],

      // Tên doanh nghiệp:"Quyết định thay đổi", "Phụ lục II-1","File_3_UyQuyen.doc",
      name: [file_contants.change_info_quyetdinh, file_contants.phu_luc_1, file_contants.change_info_uyquyen],

      // Nội dung đăng ký thuế: "Phụ lục II-1","File_3_UyQuyen.doc",
      tax: [file_contants.phu_luc_1, file_contants.change_info_uyquyen],
    },
    pending: {
      approve: {},
      cancel: {},
    },
    dissolution: {
      approve: [file_contants.giai_the_1, file_contants.giai_the_A, file_contants.giai_the_uy_quyen],
      cancel: [file_contants.giai_the_B, file_contants.giai_the_uy_quyen],
    },
  };

  let newData = {
    track,
    payment,
    data,
    categories,
    orderOwner: req.id,
    name: shortid.generate(),
    products: selectChildProduct ? selectChildProduct : selectProduct,
  };

  // console.log(data);
  let files = findKeysByObject(data, list_files).flat();

  newData.files = files;

  // Handle Calculate Price with multi Product

  let price = 0;

  // Push Multi Product

  if (selectChildProduct) {
    // By child product
    price += await calcPrice(selectChildProduct);
  }

  if (selectProduct) {
    // By Category product
    price += await calcPrice(selectProduct);
  }

  newData.price = price;

  newData.slug = newData.name + "-" + shortid.generate();

  let _save = new Order({ ...newData });
  let _obj = await _save.save();

  try {
    return successHandler(_obj, res);
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.orderWithPayment = async (req, res) => {
  // const session = await mongoose.startSession();

  let exist = await Order.findOne({ orderId: req.body.orderId }); // findOne.length > 0 => exist || valid

  if (exist) return existHandler(res);

  //  khai báo
  const { track, payment, data, categories } = req.body;
  const { selectProduct, selectChildProduct } = data;

  var newData = {
    track,
    payment,
    data,
    categories,
    orderOwner: req.id,
    name: shortid.generate(),
    products: selectChildProduct ? selectChildProduct : selectProduct,
  };

  let price = 0;

  // Handle Calculate Price with multi Product

  if (selectChildProduct) {
    // By child product
    price += await calcPrice(selectChildProduct);
  }

  if (selectProduct) {
    // By Category product
    price += await calcPrice(selectProduct);
  }

  newData.price = price;

  newData.slug = newData.name + "-" + shortid.generate();

  let _save = new Order({ ...newData });

  let _obj = await _save.save();

  // handle Payment Here
  let params = {
    amount: price * 100,
    // orderInfo: `Thanh toán đơn hàng ${_obj.name} tại app.thanhlapcongtyonline.vn`,
    // _id: _obj._id,
    orderInfo: _obj._id,
    orderId: req.body.orderId,
    createDate: req.body.createDate,
  };

  try {
    // return successHandler(_obj, res);
    return paymentOrder(req, res, params);
  } catch (err) {
    return errHandler(err, res);
  }
};

const paymentOrder = (req, res, params) => {
  let { createDate, orderId, amount, orderInfo } = params;

  var ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = process.env.TMN_CODE_VPN;

  var secretKey = process.env.SECRET_KEY_VPN;

  var vnpUrl = process.env.VNPAY_URL;

  var returnUrl = process.env.RETURN_URL;

  var orderType = req?.body?.orderType || "billpayment";

  var locale = (Boolean(req.body?.language) && req.body?.language) || "vn";

  var vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: "VND",
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_Amount: amount,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  vnp_Params = sortObject(vnp_Params);

  var signData = qs.stringify(vnp_Params, { encode: false });

  var hmac = crypto.createHmac("sha512", secretKey);

  var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  vnp_Params["vnp_SecureHash"] = signed;

  vnpUrl += "?" + qs.stringify(vnp_Params, { encode: false });

  return res.status(200).json({ status: 200, url: vnpUrl });
};

exports.getUrlReturn = async (req, res) => {
  console.log(req.query, " Get URL Return");
  var vnp_Params = req.query;

  var secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  var tmnCode = process.env.TMN_CODE_VPN;

  var secretKey = process.env.SECRET_KEY_VPN;

  var signData = qs.stringify(vnp_Params, { encode: false });

  var hmac = crypto.createHmac("sha512", secretKey);

  var signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    let code = vnp_Params["vnp_ResponseCode"];
    const query = qs.stringify({
      code,
      text: ResponseCode[code],
    });

    if (code === "00") {
      // Success
      const _update = {
        payment: "1",
      };
      await Order.findOneAndUpdate({ _id: req.query.vnp_OrderInfo }, _update, { new: true });

      console.log("updated Success");
    }

    return res.redirect(`${process.env.BASEHOST}/user/order?` + query);
  } else {
    const query = qs.stringify({
      code: ResponseCode[97],
    });
    return res.redirect(`${process.env.BASEHOST}/user/order?` + query);
  }
};

function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

const calcPrice = async (productArray) => {
  if (typeof productArray === "string") {
    let _product = await Product.findOne({ _id: productArray }).select("price");
    return _product.price;
  }

  let allProduct = productArray?.map(async (_id) => {
    let _product = await Product.findOne({ _id: _id }).select("price");
    return _product;
  });

  return await Promise.all(allProduct)
    .then((res) => res.reduce((prev, current) => (prev += current.price), 0))
    .catch((err) => console.log(err));
};

const findKeysByObject = (obj, listfiles) => {
  if (!obj) return;
  let files;
  for (let prop in obj) {
    if (listfiles[prop]) {
      files = Object.keys(obj[prop]).map((key) => {
        if (obj[prop][key]) {
          return listfiles[prop][key];
        }
      });
    }
  }
  return files;
};
