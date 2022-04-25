import connectDB from "@/config/connectDB";
import { authenticated, authFailedHandler, errHandler, existHandler, successHandler } from "@/api/authenticate";
import { TemplateMail } from "@/server/models";
// import { Order, Product } from "../../../server/models";
// import dateFormat from "dateformat";
// import shortid from "shortid";
// import mongoose from "mongoose";

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
  const { page, get } = req.query;
  let current_page = (parseInt(page) - 1) * PAGE_SIZE;
  let _template = [];
  if (page) {
    _template = await TemplateMail.find({})
      .select("_id name content subject")
      .skip(current_page)
      .limit(PAGE_SIZE)
      .sort("-createdAt");
  } else {
    _template = await TemplateMail.find({}).select("_id name content subject").sort("-createdAt");
  }

  let count = await TemplateMail.count();

  try {
    return successHandler({ _template, count }, res);
  } catch (e) {
    return errHandler(e, res);
  }
}, admin);
