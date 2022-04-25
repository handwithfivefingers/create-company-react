// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@/server/models";
import connectDB from "@/config/connectDB";
import { authenticated, errHandler, successHandler, permisHandler } from "@/api/authenticate";
import bcrypt from "bcryptjs";
connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await changePassword(req, res);
      break;
  }
}

const changePassword = authenticated(async (req, res) => {
  let { old_password, new_password, confirm_password } = req.body;
  let _ = undefined;
  if (req.role.toLowerCase() === "admin") {
    return permisHandler(res);
  }

  if (new_password !== confirm_password) return errHandler("Xác thực mật khẩu không dúng", res);

  let _user = await User.findOne({ _id: req.user });

  let password = await _user.authenticate(old_password);

  if (password) {
    const hash_password = await bcrypt.hash(new_password, 10);
    let _new = await User.findOneAndUpdate({ _id: req.user }, { hash_password }, { new: true }).select(
      "name email phone",
    );
    try {
      return successHandler(_new, res);
    } catch (err) {
      return errHandler(err, res);
    }
  }
  return errHandler("Mật khẩu không đúng", res);
});
