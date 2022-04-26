const { User } = require("../../model");
const { successHandler, errHandler } = require("../../response");

exports.fetchUser = async (req, res) => {
  let _user = [];

  _user = await User.find({}).select("-hash_password").sort("-createdAt");

  let count = await User.count();

  try {
    return successHandler({ _user, count }, res);
  } catch (e) {
    return errHandler(e, res);
  }
};
