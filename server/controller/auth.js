// import User from "./../model/user";
const { User } = require("./../model");
const bcrypt = require("bcryptjs");
const { loginFailed, createdHandler, errHandler, existHandler } = require("../response");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    let _user = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
    let message = _user?.phone === req.body.phone ? "Phone" : "Email"; // if have user -> check mail or phone
    if (_user) return existHandler(res, message);
    const { phone, name, email, url } = req.body;

    var password = Math.random().toString(36).slice(-8);

    const hash_password = await bcrypt.hash(password, 10);

    const _obj = new User({
      phone,
      name,
      email,
      hash_password,
    });
    const _save = await _obj.save();
    try {
      const { _id, name, email } = _save;
      const user = {
        phone,
        password,
        email,
      };
      // await handleMailer(user);  Handling sendmail
      return createdHandler(user, res);
    } catch (error) {
      return errHandler(error, res);
    }
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const resp = await User.findOne({ phone: req.body.phone });

    if (resp) {
      const auth = await resp.authenticate(req.body.password);

      if (auth) {
        const token = jwt.sign({ _id: resp._id, role: resp.role }, process.env.SECRET, {
          expiresIn: process.env.EXPIRE_TIME,
        });

        let newData = {
          _id: resp._id,
          name: resp.name,
          email: resp.email,
          phone: resp.phone,
          role: resp.role,
        };
        var hour = 3600000;

        res.cookie("create-company-token", token, {
          maxAge: 2 * 24 * hour,
          httpOnly: true,
        });
        return res.status(200).json({
          data: newData,
          authenticate: true,
          callbackUrl: req.body.callbackUrl || `/${newData.role}`,
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
  console.log(req.cookies["create-company-token"]);
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
