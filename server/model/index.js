const user = require("./user");
const company = require("./company");
const order = require("./order");
const category = require("./category");
const career = require("./career");
const product = require("./product");
const template = require("./template");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

// // Step 1 : Create Schema

const userSchema = new Schema({ ...user }, { timestamps: true });
const companySchema = new Schema({ ...company }, { timestamps: true });
const orderSchema = new Schema({ ...order }, { timestamps: true });
const categorySchema = new Schema({ ...category }, { timestamps: true });
const careerSchema = new Schema({ ...career }, { timestamps: true });
const productSchema = new Schema({ ...product }, { timestamps: true });
const templateSchema = new Schema({ ...template }, { timestamps: true, collation: { locale: "en_US", strength: 1 } });

// // Step 2 : Create Methods - Function

userSchema.method({
  authenticate: async function (password) {
    // console.log(this);
    return await bcrypt.compare(password, this.hash_password);
  },
});

// // Step 3: Create Models

const User = mongoose.model("User", userSchema);

const Company = mongoose.model("Company", companySchema);
// //  mongoose.models.Company || mongoose.model("Company", companySchema);
const Order = mongoose.model("Order", orderSchema);
// //  mongoose.models.Order || mongoose.model("Order", orderSchema);
const Category = mongoose.model("Category", categorySchema);
// //  mongoose.models.Category || mongoose.model("Category", categorySchema);
const Career = mongoose.model("Career", careerSchema);
// //  mongoose.models.Career || mongoose.model("Career", careerSchema);
const Product = mongoose.model("Product", productSchema);
// //  mongoose.models.Product || mongoose.model("Product", productSchema);
const TemplateMail = mongoose.model("TemplateMail", templateSchema);
// //  mongoose.models.TemplateMail || mongoose.model("TemplateMail", templateSchema);

// // Step 4 : Create Virtual Field - Reference

orderSchema.virtual("main_career", {
  ref: "Career",
  localField: "data.create_company.company_main_career",
  foreignField: "_id",
});

orderSchema.virtual("opt_career", {
  ref: "Career",
  localField: "data.create_company.company_opt_career",
  foreignField: "_id",
});

orderSchema.virtual("data.create_company.main_career", {
  ref: "Career",
  localField: "data.create_company.company_main_career",
  foreignField: "_id",
});

orderSchema.virtual("data.create_company.opt_career", {
  ref: "Career",
  localField: "data.create_company.company_opt_career",
  foreignField: "_id",
});

module.exports = { User, Company, Career, Order, Product, Category, TemplateMail };