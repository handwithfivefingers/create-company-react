const fs = require("fs");

exports.loginFailed = (res) => {
  return res.status(200).json({
    message: "Sai tài khoản hoặc mật khẩu!",
    success: false,
    status: 401,
  });
};

exports.authFailedHandler = (res) => {
  return res.status(200).json({
    message: "Authorization required",
    success: false,
    status: 401,
  });
};

exports.errHandler = (err, res) => {
  return res.status(400).json({
    error: err,
    message: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
    status: 400,
    success: false,
  });
};

exports.successHandler = (data, res, props = null) => {
  return res.status(200).json({
    data,
    message: "Thành công",
    status: 200,
    success: true,
    type: props?.type,
  });
};

exports.updatedHandler = (data, res) => {
  return res.status(200).json({
    data,
    message: "Cập nhật thành công",
    status: 200,
    success: true,
  });
};

exports.createdHandler = (data, res) => {
  return res.status(200).json({
    data,
    message: "Tạo thành công",
    status: 201,
    success: true,
  });
};

exports.deletedHandler = (data, res) => {
  return res.status(200).json({
    // data,
    message: "Xóa thành công",
    status: 200,
    success: true,
  });
};

exports.existHandler = (res, message = null) => {
  return res.status(200).json({
    message: `${message ? message : "Data"} đã tồn tại, vui lòng thử lại`,
    success: false,
    status: 400,
  });
};

exports.permisHandler = (res) => {
  return res.status(200).json({
    message: "Permission Confused",
    success: false,
    status: 401,
  });
};

exports.removeFile = async (pathName) => {
  fs.stat(pathName, function (err, stats) {
    if (err) {
      return err;
    }
    fs.unlink(pathName, function (err) {
      if (err) return err;
      return "Deleted Successfully";
    });
  });
};
