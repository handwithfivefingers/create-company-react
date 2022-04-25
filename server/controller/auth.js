// import User from "./../model/user";
const { User } = require("./../model");
const bcrypt = require("bcryptjs");
const { loginFailed } = require("../response");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (err, data) => {
    if (data) return res.status(400);

    const hash_password = await bcrypt.hash(req.body.password, 10);

    let _user = new User({
      hash_password,
      username: req.body.username,
    });

    _user.save((error, data) => {
      if (error) return res.status(400).json({ error });
      if (data) {
        const token = jwt.sign({ _id: data._id, role: data.role }, process.env.SECRET, {
          expiresIn: process.env.EXPIRE_TIME,
        });
        return res.status(200).json({ data, token });
      }
    });
  });
};

exports.signIn = async (req, res) => {
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
        res.cookie("create-company-token", token, {
          maxAge: 900000,
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

exports.authenticate = async (req, res) => {
  console.log(req.role);
  return res.status(200).json({
    authenticate: true,
    role: req.role,
  });
};
