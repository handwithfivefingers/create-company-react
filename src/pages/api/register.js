// import { getSession } from 'next-auth/react';
import connectDB from "@/config/connectDB";
import { User } from "@/server/models";
import bcrypt from "bcryptjs";
import { handleMailer } from "@/api/sendmail";
import { createdHandler, errHandler, existHandler } from "@/api/authenticate";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await createUser(req, res);
      break;
  }
}
const createUser = async (req, res) => {
  User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] }).exec(async (err, _user) => {
    let message = _user?.phone === req.body.phone ? "Phone" : "Email"; // if have user -> check mail or phone
    if (_user) return existHandler(res, message);
    if (err) return errHandler(err, res);

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
      await handleMailer(user);
      return createdHandler(user, res);
    } catch (error) {
      return errHandler(error, res);
    }
  });
};
