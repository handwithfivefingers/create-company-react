const { errHandler, successHandler } = require("../../response");
const { TemplateMail } = require("../../model");
const PAGE_SIZE = 10;

exports.fetchTemplate = async (req, res) => {
  const { page, get } = req.query;
  let current_page = (parseInt(page) - 1) * PAGE_SIZE;
  let _template = [];

  let count = await TemplateMail.count();

  try {
    if (page) {
      _template = await TemplateMail.find({})
        .select("_id name content subject")
        .skip(current_page)
        .limit(PAGE_SIZE)
        .sort("-createdAt");
    } else {
      _template = await TemplateMail.find({}).select("_id name content subject").sort("-createdAt");
    }
    return successHandler({ _template, count }, res);
  } catch (err) {
    return errHandler(err, res);
  }
};
