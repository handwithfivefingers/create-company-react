import { Form, Input, Button, Card, Spin, Space } from "antd";
import React, { useRef, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./Register.module.scss";
const Register = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const onFinish = async (val) => {
    setLoading(true);
    let { phone, password } = val;
    const res = await axios.post("/api/register", { phone, password });
    console.log(res);
    if (res) {
      signIn("credentials", {
        phone: user,
        password: password,
        callbackUrl: `${window.location.origin}/`,
      }).finally(() => setLoading(false));
    }
  };

  return (
    <div className={clsx([styles.registerWrap, "container"])}>
      <h1>Đăng kí</h1>

      <Spin spinning={loading}>
        <Form ref={formRef} onFinish={onFinish} layout="vertical">
          <Form.Item label="Họ và tên" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại (Zalo)">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input.Password />
          </Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="primary" htmlType="submit">
              Đăng kí
            </Button>
            <Link href="/login" passHref>
              <a> Đăng nhập</a>
            </Link>
          </Space>
        </Form>
      </Spin>
    </div>
  );
};

export default Register;
