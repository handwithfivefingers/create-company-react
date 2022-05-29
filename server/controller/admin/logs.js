const { errHandler, successHandler } = require("../../response");
const { Log } = require("../../model");

exports.getLogs = async (req, res) => {
  console.log('coming here')
  try {
    let _logs = await Log.find({});
    if (_logs) {
      return successHandler(_logs, res);
    } else {
      return errHandler(_logs, res);
    }
  } catch (err) {
    return errHandler(err, res);
  }
};
