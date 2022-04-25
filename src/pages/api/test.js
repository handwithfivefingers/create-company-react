export default function handler(req, res) {
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
  console.log(req);
  fetch(
    "https://sandbox.vnpayment.vn/tryitnow/Home/VnPayIPN?vnp_Amount=1234500&vnp_BankCode=NCB&vnp_OrderInfo=12345&vnp_PayDate=20220106164420&vnp_ResponseCode=00&vnp_TmnCode=6KGPLEH9&vnp_TransactionNo=13668438&vnp_TxnRef=160120&vnp_TransactionStatus=00&vnp_SecureHash=af534b7fda043cf069c2d7e4135ad0cd5cef596e701de5c567d12ead050d2ce2630f21b63092847d73082d09e77bb3383f10bd53b3c649cdf406c11115931d1c",
  )
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((resp) => {
      console.log("resp", resp);
      return res.redirect('/')
    //   return res.status(200).json({ data: resp });
    })
    .catch((err) => {
      console.log(err);
      return res.status(200).json({
        error: err,
      });
    });
//   res.status(200).json({ message: " failed" });
}
