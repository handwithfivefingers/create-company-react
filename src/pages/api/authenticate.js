import { getToken } from "next-auth/jwt";
import fs from "fs";
const secret = process.env.SECRET;
export const authenticated =
  (fn, condition = null) =>
  async (req, res) => {
    const token = await getToken({ req, secret });

    // console.log(token);
    // {
    //   name,
    //     email,
    //     sub,
    //     id,
    //     role,
    //     iat,
    //     exp,
    //     jti
    // }

    if (token) {
      req.user = token.id;
      req.role = token.role;
      condition && token.role.toLowerCase() !== condition ? permisHandler(res) : await fn(req, res);
    } else {
      return authFailedHandler(res);
    }
  };

  
export const authFailedHandler = (res) => {
  return res.status(200).json({
    message: "Authorization required",
    success: false,
    status: 401,
  });
};


export const errHandler = (err, res) => {
  return res.status(200).json({
    error: err,
    message: "Đã có lỗi xảy ra, vui lòng thử lại sau!",
    status: 400,
    success: false,
  });
};


export const successHandler = (data, res, props = null) => {
  return res.status(200).json({
    data,
    message: "Thành công",
    status: 200,
    success: true,
    type: props?.type,
  });
};


export const updatedHandler = (data, res) => {
  return res.status(200).json({
    data,
    message: "Cập nhật thành công",
    status: 200,
    success: true,
  });
};


export const createdHandler = (data, res) => {
  return res.status(200).json({
    data,
    message: "Tạo thành công",
    status: 201,
    success: true,
  });
};


export const deletedHandler = (data, res) => {
  return res.status(200).json({
    // data,
    message: "Xóa thành công",
    status: 200,
    success: true,
  });
};


export const existHandler = (res, message = null) => {
  return res.status(200).json({
    message: `${message ? message : "Data"} đã tồn tại, vui lòng thử lại`,
    success: false,
    status: 400,
  });
};


export const permisHandler = (res) => {
  return res.status(200).json({
    message: "Permission Confused",
    success: false,
    status: 401,
  });
};


export const removeFile = async (pathName) => {
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
