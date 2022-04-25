import connectDB from "@/config/connectDB";
import { authenticated, authFailedHandler, errHandler, existHandler, successHandler } from "@/api/authenticate";
import { User } from "@/server/models";

const PAGE_SIZE = 10;

connectDB();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getTemplate(req, res);
  }
}

const admin = "admin";

const getTemplate = authenticated(async (req, res) => {
  //   const { page } = req.query;

  //   let current_page = (parseInt(page) - 1) * PAGE_SIZE;

  let _user = [];

  _user = await User.find({}).select("-hash_password").sort("-createdAt");

  let count = await User.count();

  try {
    return successHandler({ _user, count }, res);
  } catch (e) {
    return errHandler(e, res);
  }
}, admin);
