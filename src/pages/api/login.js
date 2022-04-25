// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {User} from "@/server/models";
import connectDB from "@/config/connectDB";

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
    // case "GET":
    //   await getUser(req, res)
  }
}



const login = (req, res) => {
  User.findOne({
    phone: req.body.phone,
  }).exec(async (error, user) => {
    if (error)
      return res
        .status(200)
        .json({ message: "User not found", success: false, status: 400 });
    if (user) {
      let password = await user.authenticate(req.body.password);
      if (password) {
        const { _id, name, email, role } = user;
        return { _id, name, email, role }
      } else {
        return res.status(400).json({
          message: 'Sai mật khẩu, vui lòng thử lại sau !'
        })
      }
    }
  });
};
