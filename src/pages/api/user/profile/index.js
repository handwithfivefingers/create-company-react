// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@/server/models";
import connectDB from "@/config/connectDB";
import { authenticated, errHandler, successHandler, permisHandler } from "@/api/authenticate";
import bcrypt from "bcryptjs";
connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await getProfile(req, res);
      break;
  }
}

const getProfile = authenticated(async (req, res) => {
  let _ = undefined;

  //   if (req.role.toLowerCase() === "admin") {
  //     return permisHandler(res);
  //   }

  //   if (new_password !== confirm_password) return errHandler("Xác thực mật khẩu không dúng", res);

  let _user = await User.findOne({ _id: req.user }).select("name email phone");

  try {
    return successHandler(_user, res);
  } catch (err) {
    return errHandler(err, res);
  }

//   return errHandler("Mật khẩu không đúng", res);
});
