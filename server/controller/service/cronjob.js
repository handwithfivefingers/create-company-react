const { removeFile } = require("../../response");
const { Order } = require("../../model");

const docxConverter = require("docx-pdf");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const cron = require("node-cron");

exports.task = cron.schedule(
  "* * * * *",
  async () => {
    let _order = await Order.find({ payment: 1 });
    console.log("running Task", _order);
  },
  {
    scheduled: false,
  }
);
