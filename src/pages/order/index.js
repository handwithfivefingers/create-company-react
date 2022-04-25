import { Button, Result } from 'antd';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '../../config/axios';

const OrderPayment = (props) => {

  const router = useRouter();
  const [data, setData] = useState({})
  useEffect(() => {
    // window !== undefined ? window.history.replaceState(null, '', '/order') : ''
    setData({
      ...props.data
    })
    saveData({ ...props.data });
  }, []);

  const saveData = async (params) => {
    console.log(params);
    const res = await axios.get('/api/payment', {params});
    console.log(res)
  }
  // console.log(router.query);
  // /?vnp_Amount=99999900
  // &vnp_BankCode=NCB
  // &vnp_BankTranNo=20220103015724
  // &vnp_CardType=ATM
  // &vnp_OrderInfo=Test+payment+by+submit+form
  // &vnp_PayDate=20220103015715
  // &vnp_ResponseCode=00
  // &vnp_TmnCode=6KGPLEH9
  // &vnp_TransactionNo=13665824
  // &vnp_TransactionStatus=00
  // &vnp_TxnRef=010100
  // &vnp_SecureHash=710c55da2306a0aa469d88013d94f727ad63b6cda8a6842db05911f17a4f67702ab1e6316b4afa123bdb6ecf5e8f5e6407acc8ef211f361deb9399a506e139ec

  return (
    <Result
      status="success"
      title={`Hóa đơn #${data?.vnp_TxnRef} đã thanh toán hoàn tất`}
      subTitle={`Số tiền thanh toán ${Intl.NumberFormat().format(data?.vnp_Amount / 100)} VND `}
      extra={[
        <Button type="primary" key="console">
          Kiểm tra Orders
        </Button>,
        <Button key="buy"><Link href="/">Quay về trang chủ</Link></Button>,
      ]}
      style={{marginTop:50}}
    />
  );
};

export default OrderPayment;

export const getServerSideProps = async (context) => {
  let params = context.query;
  // const resp = await axios.get('http://localhost:3000/api/payment')
  // console.log(resp)
  // console.log(context)
  return {
    props: {
      data: params
    }
  }
}

