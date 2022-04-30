import React, { useContext, useEffect, useRef, useState } from "react";
import LoginForm from "src/components/Form/Login";
import RegisterForm from "src/components/Form/Register";
import { useNavigate, useLocation, useNavigationType } from "react-router-dom";

import { Tabs } from "antd";
import AuthService from "src/service/AuthService";
import { AuthAction } from "src/store/actions";
import { useDispatch, useSelector } from "react-redux";
import RouterContext from "src/helper/Context";

const { TabPane } = Tabs;

export default function HomePage() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { route } = useContext(RouterContext);
  const authReducer = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  let location = useLocation();
  let type = useNavigationType();
  useEffect(() => {
    if (route.to && authReducer.status) {
      navigate(route.to);
    }
  }, []);

  const onLogin = async (val) => {
    setLoading(true);
    dispatch(AuthAction.AuthLogin(val)).then((callbackUrl) => navigate(route.to || -1));
    setLoading(false);
  };

  const onRegister = async (val) => {
    console.log(val);
  };

  //   const onRegister = async (val) => {
  //     setLoading(true);
  //     let { phone, email, name } = val;
  //     const res = await axios.post("/api/register", { phone, email, name });
  //     console.log(res);
  //     if (res) {
  //       signIn("credentials", {
  //         phone,
  //         password,
  //         callbackUrl: `${window.location.origin}/`,
  //       }).finally(() => setLoading(false));
  //     }
  //   };

  //   if (status === "authenticated") {
  //     Router.push("/");
  //   }
  if (authReducer.status) {
    // console.log(navigate, location, type);
    // navigate(-1 || authReducer.role);
    if (type !== "POP") {
      navigate(-1);
    } else {
      navigate(authReducer.role);
    }
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
}
