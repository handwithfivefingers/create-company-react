export default async function handler(req, res) {
  //   let params = {
  //     vnp_Amount: "1234500",
  //     vnp_BankCode: "NCB",
  //     vnp_BankTranNo: "20220106164423",
  //     vnp_CardType: "ATM",
  //     vnp_OrderInfo: "12345",
  //     vnp_PayDate: "20220106164420",
  //     vnp_ResponseCode: "00",
  //     vnp_SecureHash:
  //       "af534b7fda043cf069c2d7e4135ad0cd5cef596e701de5c567d12ead050d2ce2630f21b63092847d73082d09e77bb3383f10bd53b3c649cdf406c11115931d1c",
  //     vnp_TmnCode: "6KGPLEH9",
  //     vnp_TransactionNo: "13668438",
  //     vnp_TransactionStatus: "00",
  //     vnp_TxnRef: "160120",
  //   };
  let { pid } = req.query;
  console.log("query", pid);

  // var secretKey = "AGYRQMFNZHMFDYBWOVAIBJZMZHZHLDUO";
  // var secureHash = vnp_Params["vnp_SecureHash"];
  // delete vnp_Params["vnp_SecureHash"];
  // delete vnp_Params["vnp_SecureHashType"];

  // var querystring = require("qs");
  // var signData = querystring.stringify(vnp_Params, { encode: false });
  // var crypto = require("crypto");
  // var hmac = crypto.createHmac("sha512", secretKey);
  // var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  // if (secureHash === signed) {
  //   var orderId = vnp_Params["vnp_TxnRef"];
  //   var rspCode = vnp_Params["vnp_ResponseCode"];
  //   // console.log(orderId, rspCode)
  //   if (orderId) {
  //     let _com = await Company.findOneAndUpdate(
  //       {
  //         orderId: orderId,
  //       },
  //       { status: 1 },
  //       { new: true },
  //     );
  //     res
  //       .status(200)
  //       .json({ RspCode: rspCode, Message: "success", data: _com });
  //   }
  //   //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
  // } else {
  //   res.status(200).json({ RspCode: "97", Message: "Fail checksum" });
  // }
  
  fetch(`https://sandbox.vnpayment.vn/tryitnow/Home/VnPayIPN?${pid}`)
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((resp) => {
      console.log("resp", resp);
      return res.status(200).json({ data: resp });
    })
    .catch((err) => {
      console.log(err);
      return res.status(200).json({
        error: err,
      });
    });
}
