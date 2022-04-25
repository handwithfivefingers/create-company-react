const mongoose = require("mongoose");

module.exports  = {
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  orderOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  track: {
    step: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  payment: {
    type: String,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  data: {
    create_company: {
      type: Object,
    },
    change_info: {
      type: Object,
    },
  },
  orderId: {
    type: Number,
    // unique: true,
    required: true,
  },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
};

// company_main_career;
// company_opt_career;

// orderSchema.virtual("data.create_company.main_career", {
//   ref: "Career",
//   localField: "data.create_company.company_main_career",
//   foreignField: "_id",
// });

// orderSchema.virtual("data.create_company.opt_career", {
//   ref: "Career",
//   localField: "data.create_company.company_opt_career",
//   foreignField: "_id",
// });

// orderSchema.virtual('products', {
//   ref:'Product',
//   localField: 'product',
//   foreignField: "_id"
// })

// models -> check exists then return else create
// let Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

// const careerSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       min: 3,
//       max: 20,
//     },
//     code: {
//       type: String,
//       required: true,
//       trim: true,
//       min: 1,
//     },
//   },
//   { timestamps: true }
// );

// // careerSchema.virtual('products', {
// //   ref: 'Product',
// //   localField: '_id',
// //   foreignField: 'nganhnghe'
// // });

// // models -> check exists then return else create
// let Career = mongoose.models.Career || mongoose.model("Career", careerSchema);

// export default Dataset;
