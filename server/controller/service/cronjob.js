const { Order } = require("../../model");
const cron = require("node-cron");

exports.task = cron.schedule(
  "* * * * *",
  async () => {
    let _order = await Order.find({ payment: "1" });
    console.log("running Task", _order);

  },
  {
    scheduled: false,
  }
);
