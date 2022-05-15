const { Product, Category, Career } = require("./../model");
const {
  updatedHandler,
  errHandler,
  successHandler,
  createdHandler,
  existHandler,
  deletedHandler,
} = require("../response");

exports.createCareer = async (req, res) => {
  const career = await Career.findOne({
    code: req.body.code,
  });

  if (career) return existHandler(career, res);

  const obj = {
    name: req.body.name,
    code: req.body.code,
  };

  const _career = new Career(obj);
  const data = await _career.save();

  try {
    return createdHandler(data, res);
  } catch (err) {
    return errHandler(err, res);
  }
};

exports.fetchCareer = async (req, res) => {
  Career.find().exec((err, career) => {
    if (err) return errHandler(err, res);

    if (career) return successHandler(career, res);
  });
};

exports.editCareer = async (req, res) => {
  let { id } = req.params;

  const _update = {
    name: req.body.name,
    code: req.body.code,
  };

  try {
    let _updated = await Career.updateOne({ _id: id }, _update, { new: true });
    return updatedHandler(_updated, res);
  } catch (e) {
    return errHandler(e, res);
  }
};

exports.deleteCareer = async (req, res) => {
  let { id } = req.params;

  await Career.findOneAndDelete({ _id: id });

  try {
    return deletedHandler("", res);
  } catch (e) {
    return errHandler(e, res);
  }
};
