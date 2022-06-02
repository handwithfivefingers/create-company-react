const { Order, Setting } = require("../../model");

const { cronMail } = require("../sendmail");

const { flattenObject, convertFile } = require("./../../common/helper");
const fs = require("fs");
const cron = require("node-cron");

exports.task = cron.schedule(
  "* * * * *",
  async () => {
    // let _order = await Order.find({ payment: 1 });
    // console.log("running Task", _order);
    // ->
    // return checkingOrder(req, res);
    // let _order = await Order.findOne({ _id: "62964a487b774763c605eab8" }).populate("orderOwner", "email");
    let _order = await Order.findOne({ $and: [{ send: 0 }] }).populate("orderOwner", "email");

    return handleConvertFile(_order);
  },
  {
    scheduled: false,
  }
);

const handleConvertFile = async (order) => {
  // handle Single File
  let attachments = [];

  try {
    let { files, data } = order;

    let mailParams = await getMailContent(order);

    if (files) {
      let _contentOrder = flattenObject(data);

      for (let file of files) {
        console.log("start");

        let pdfFile = await convertFile(file, _contentOrder);

        console.log("pdfFile", pdfFile);

        attachments.push({ pdfFile, name: file.name });
      }

      mailParams.filesPath = attachments;

      await cronMail(mailParams);

      // return res.status(200).json({ message: "ok" });
      return console.log("Cronjob success");
    }
    return console.log("Cronjob error");
  } catch (err) {
    console.log("handleConvertFile error", err);
    throw err;
  } 
  // finally {
  //   // for (let attach of attachments) {
  //   //   attach && fs.unlinkSync(attach.pdfFile);
  //   // }
  // }
};

const getMailContent = async (order) => {
  let _setting = await Setting.find().populate("mailRegister mailPayment"); // -> _setting
  let mailParams;
  mailParams = {
    email: "handgod1995@gmail.com",
    removeFiles: true,
    send: 1,
    _id: order._id,
    type: "path",
  };
  if (_setting) {
    let { mailPayment } = _setting[0];
    let { subject, content } = mailPayment;
    mailParams.subject = subject;
    mailParams.content = content;
    // mailParams.email = order.orderOwner.email;
  } else {
    mailParams.subject = "Testing auto generate files";
    mailParams.content = "Testing auto generate files";
  }
  return mailParams;
};
