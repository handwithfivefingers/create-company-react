// // import { getSession } from 'next-auth/react';
// import connectDB from "./../../config/connectDB";

// import { Company } from "./../../server/models";

// import dateFormat from "dateformat";
// import { authenticated, errHandler, existHandler, successHandler } from "./authenticate";
// import { paymentOrder } from "./payment";
// import shortid from "shortid";
// import slugify from "slugify";
// import { getToken } from "next-auth/jwt";
// const secret = process.env.SECRET;
// connectDB();

// export default async function handler(req, res) {
//   switch (req.method) {
//     case "POST":
//       await createCompany(req, res);
//       break;
//   }
// }

// const createCompany = authenticated(async (req, res) => {
//   const { sub } = await getToken({ req, secret });
//   Company.findOne({
//     company_core: {
//       name: req.body.company_core.name,
//     },
//   }).exec(async (err, com) => {
//     if (com) return existHandler(res);
//     const date = new Date();
//     const {
//       base_val,
//       company_main_career,
//       company_opt,
//       company_value,
//       legal_respon,
//       company_core,
//       origin_person,
//       per_main,
//       present_person,
//       _id,
//       productId,
//     } = req.body;
//     if (present_person) {
//     }
//     const _company = new Company({
//       base_val,
//       company_main_career,
//       company_opt,
//       company_value,
//       legal_respon,
//       company_core,
//       origin_person,
//       per_main,
//       present_person,
//       userOwner: sub,
//       status: 0,
//       productId: req.body.selectProduct,
//       slug: slugify(req.body.company_core.name).toLowerCase() + "-" + shortid.generate(), // Dương dan --<
//     });
//     _company.save(async (error, data) => {
//       if (error) return errHandler(error, res);
//       if (data) {
//         // try {
//         //   //handle Payment Here
//         //   let params = {
//         //     amount: 999999,
//         //     orderDescription: `Payment with ID ${orderId}`,
//         //     orderId,
//         //   };
//         //   // let res = await paymentOrder(req, res, params)
//         //   return await paymentOrder(req, res, params);
//         //   // return res.status(200).json({ url: vnpUrl });
//         // } catch (error) {
//         //   return res.status(200).json({
//         //     message: error,
//         //   });
//         // }
//         return successHandler(data, res);
//       }
//     });
//   });
// });
