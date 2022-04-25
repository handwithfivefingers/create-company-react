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
  let { email, phone, name } = req.body;

  let _ = undefined;
  if (req.role.toLowerCase() === "admin") {
    return permisHandler(res);
  }


  let _new = await User.findOneAndUpdate({ _id: req.user }, { email, phone, name }, { new: true }).select(
    "name email phone",
  );
  
  try {
    return successHandler(_new, res);
  } catch (err) {
    return errHandler(err, res);
  }

});
