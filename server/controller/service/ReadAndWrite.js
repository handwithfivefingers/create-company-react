const { Order, Setting } = require("../../model");

const fs = require("fs");

const libre = require("libreoffice-convert");

const { flattenObject, convertFile } = require("./../../common/helper");

const { sendmailWithAttachments } = require("../sendmail");
libre.convertAsync = require("util").promisify(libre.convert);

exports.checkingOrder = async (req, res) => {
  try {
    // let _order = await Order.findOne({ $and: [{ payment: 1, send: 0 }] }).populate("orderOwner", "email");
    let _order = await Order.findOne({ _id: "6288897f4eba512e84f8bdb3" }).populate("orderOwner", "email");

    return handleConvertFile(_order, req, res);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};
const getMailContent = async (order) => {
  let _setting = await Setting.find().populate("mailRegister mailPayment"); // -> _setting
  let mailParams;
  if (_setting) {
    let { mailPayment } = _setting[0];
    let { subject, content } = mailPayment;
    mailParams = {
      email: order.orderOwner.email,
      subject,
      content,
      removeFiles: true,
      send: 1,
      _id: order._id,
      type: "path",
    };
  } else {
    mailParams = {
      email: "handgod1995@gmail.com",
      subject: "Testing auto generate files",
      content: "Testing auto generate files",
      removeFiles: true,
      send: 1,
      _id: order.orderOwner._id,
      type: "path",
    };
  }
  return mailParams;
};

const handleConvertFile = async (order, req, res) => {
  // handle Single File
  try {
    let { files, data } = order;

    let attachments = [];

    let mailParams = getMailContent(order);

    if (files) {
      let _contentOrder = flattenObject(data);

      // return res.status(200).json({
      //   _contentOrder,
      // });

      try {
        for (let file of files) {

          console.log("start");

          let pdfFile = await convertFile(file, _contentOrder);

          console.log("pdfFile", pdfFile);

          attachments.push({ pdfFile, name: file.name });
        }
      } catch (err) {
        return res.status(400).json({
          error: err,
        });
      }

      mailParams.filesPath = attachments;

      return await sendmailWithAttachments(req, res, mailParams);

      // return res.status(200).json({ message: "ok" });
    }

    return res.status(400).json({
      error: "Files not found",
    });
  } catch (err) {
    console.log("error here");
    return res.status(400).json({
      error: err,
    });
  }
};
