import connectDB from "@/config/connectDB";
import {
  authenticated,
  authFailedHandler,
  errHandler,
  existHandler,
  successHandler,
  updatedHandler,
  deletedHandler,
} from "@/api/authenticate";
import { Career } from "@/server/models";

connectDB();

const ROLE = "admin";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await deleteCareer(req, res);
  }
}

const deleteCareer = authenticated(async (req, res) => {
  let { id } = req.query;
  console.log(id)
  await Career.findOneAndDelete({ _id: id });
  try {
    return deletedHandler("", res);
  } catch (e) {
    return errHandler(e, res);
  }
}, ROLE);