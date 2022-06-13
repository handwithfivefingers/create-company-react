const { errHandler, successHandler } = require("../../response");
const { Log } = require("../../model");

exports.getLogs = async (req, res) => {
  // console.log('coming here')
  try {
    let _logs = await Log.find({}).sort("-createdAt");;
    if (_logs) {
      return successHandler(_logs, res);
    } else {
      return errHandler(_logs, res);
    }
  } catch (err) {
    console.log('getLogs error')
    return errHandler(err, res);
  }
};
