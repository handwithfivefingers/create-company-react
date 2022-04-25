import { handleMailer } from "./sendmail";
import { successHandler, errHandler } from "./authenticate";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  // const params = req.body.params;
  // let newParams = encodeURI(params);
  // fetch(`https://thongtindoanhnghiep.co/api/company?k=${newParams}`, {
  //   headers: {
  //     "Content-Type": "application/json; charset=utf-8",
  //   },
  // })
  //   .then((resp) => {
  //     // console.log(resp)
  //     return resp.json()
  //   })
  //   .then((resp) => {
  //     console.log(resp.LtsItems)
  //     return res.status(200).json({ data: resp.LtsItems })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(200).json({ message: err, status: 400 });
  //   });
  switch (req.method) {
    case "POST":
      await sendmail(req, res);
      break;
  }
}

const sendmail = async (req, res) => {
  let data = await handleMailer({ email: req.body.email });
  try {
    return successHandler(data, res);
  } catch (err) {
    return errHandler(err, res);
  }
};
