const { Order, Setting } = require("../../model");

const libre = require("libreoffice-convert");

const { sendmailWithAttachments } = require("../sendmail");

const { errHandler } = require("../../response");

const { flattenObject, convertFile } = require("./../../common/helper");

libre.convertAsync = require("util").promisify(libre.convert);

exports.checkingOrder = async (req, res) => {
  try {
    // let _order = await Order.findOne({ $and: [{ payment: 1, send: 0 }] }).populate("orderOwner", "email");
    let _order = await Order.findOne({ _id: "629e210411f6092ca092908c" }).populate("orderOwner", "email");

    return handleConvertFile(_order, req, res);

  } catch (err) {
    
    console.log("checkingOrder err");

    return errHandler(err, res);
  }
};

const handleConvertFile = async (order, req, res) => {
  // handle Single File
  try {
    let { files, data } = order;

    let attachments = [];

    let mailParams = await getMailContent(order);
    
    files = files.filter(item => item);

    if (files) {
      let _contentOrder = flattenObject(data);

      // return res.status(200).json({
      //   _contentOrder,
      // });

      for (let file of files) {
        console.log("start");

        let pdfFile = await convertFile(file, _contentOrder);

        console.log("pdfFile", pdfFile);

        attachments.push({ pdfFile, name: file.name });
      }

      mailParams.filesPath = attachments;

      console.log("mailParams", mailParams);

      await sendmailWithAttachments(req, res, mailParams);

      return res.status(200).json({ message: "ok" });
    }

    return res.status(400).json({
      error: "Files not found",
    });
  } catch (err) {
    console.log("handleConvertFile error");

    return errHandler(err, res);
  }
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
