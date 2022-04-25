import { Button, Result } from "antd";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "../../../config/axios";

const OrderId = (props) => {
  console.log(props);
  const { params } = props;
  const router = useRouter()
  return (
    <div>
      <Result
        status="success"
        title={`Đơn hàng #${params?.slug} đã được đăng kí`}
        // subTitle={`Chi tiết vui lòng truy cập tại mục Orders`}
        extra={[
          <Button type="primary" key="console" onClick={() => router.push('/user/order')}>
            Kiểm tra Orders
          </Button>,
          <Button key="buy">
            <Link href="/">Quay về trang chủ</Link>
          </Button>,
        ]}
        style={{ marginTop: 50 }}
      />
    </div>
  );
};

export default OrderId;

export const getServerSideProps = async (ctx) => {
  console.log(ctx.query);
  let params = ctx.query;
  return {
    props: {
      // slug: ctx.slug,
      params,
    },
  };
};
