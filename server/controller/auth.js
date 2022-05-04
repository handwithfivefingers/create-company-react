// import User from "./../model/user";
const { User } = require("./../model");
const bcrypt = require("bcryptjs");
const { loginFailed, createdHandler, errHandler, existHandler } = require("../response");
const jwt = require("jsonwebtoken");
const { handleMailerWithAttachments } = require("pages/api/sendmail");

exports.registerUser = async (req, res, next) => {
  try {
    let _user = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });

    let message = _user?.phone === req.body.phone ? "Phone" : "Email"; // if have user -> check mail or phone

    if (_user) return existHandler(res, message);

    const { phone, name, email } = req.body;

    var password = Math.random().toString(36).slice(-8);

    const hash_password = await bcrypt.hash(password, 10);

    const _obj = new User({
      phone,
      name,
      email,
      hash_password,
    });

    const _save = await _obj.save();

    const { email: _email, role, _id } = _save;

    let _tokenObj = { _id, role };

    await generateToken(_tokenObj, res, next);

    const user = {
      phone,
      password,
      email: _email,
      role,
      callbackUrl: `/${role}`,
      subject: "Create user Successfully",
      content: `Chào ${name}, <br/>Tên đăng nhập là: ${phone}<br/>Mật khẩu của bạn là : ${password}`,
    };

    // await handleMailer(user);  Handling sendmail
    return await handleMailerWithAttachments(req, res, { ...user, type: "any" });
    // return createdHandler(user, res);
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.LoginUser = async (req, res, next) => {
  try {
    const resp = await User.findOne({ phone: req.body.phone });

    if (resp) {
      const auth = await resp.authenticate(req.body.password);

      if (auth) {
        let _tokenObj = { _id: resp._id, role: resp.role };

        await generateToken(_tokenObj, res);

        let newData = {
          _id: resp._id,
          name: resp.name,
          email: resp.email,
          phone: resp.phone,
          role: resp.role,
        };

        return res.status(200).json({
          data: newData,
          authenticate: true,
          callbackUrl: `/${newData.role}`,
        });
      }
    }
  } catch (err) {
    loginFailed(res);
  }
};

exports.Logout = async (req, res) => {
  console.log("running api logout");
  res.clearCookie("create-company-token");
  res.status(200).json({
    authenticate: false,
  });
};

exports.authenticate = async (req, res) => {
  console.log(req.role);
  return res.status(200).json({
    authenticate: true,
    role: req.role,
  });
};

const generateToken = async (obj, res, next) => {
  const token = await jwt.sign(obj, process.env.SECRET, {
    expiresIn: process.env.EXPIRE_TIME,
  });
  var hour = 3600000;

  res.cookie("create-company-token", token, {
    maxAge: 2 * 24 * hour,
    httpOnly: true,
  });
};
