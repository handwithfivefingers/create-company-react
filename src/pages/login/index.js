// import Link from "next/link";
import LoginForm from "@/components/Form/Login";
import RegisterForm from "@/components/Form/Register";
import { Tabs } from "antd";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Router from "next/router";
import React, { useEffect, useRef, useState } from "react";

const { TabPane } = Tabs;

const Login = (props) => {
  const formRef = useRef();
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const onLogin = async (val) => {
    setLoading(true);
    signIn("credentials", {
      phone: val.phone,
      password: val.password,
      callbackUrl: `${window.location.origin}/`,
    }).finally(() => setLoading(false));
  };

  const onRegister = async (val) => {
    setLoading(true);
    let { phone, email, name } = val;
    const res = await axios.post("/api/register", { phone, email, name });
    console.log(res);
    if (res) {
      signIn("credentials", {
        phone,
        password,
        callbackUrl: `${window.location.origin}/`,
      }).finally(() => setLoading(false));
    }
  };
  if (status === "authenticated") {
    Router.push("/");
  }

  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="Đăng nhập" key="1">
        <LoginForm ref={formRef} onFinish={onLogin} loading={loading} />;
      </TabPane>
      <TabPane tab="Đăng kí" key="2">
        <RegisterForm ref={formRef} onFinish={onRegister} loading={loading} />;
      </TabPane>
    </Tabs>
  );
};

export default Login;
