// import axios from "./../config/axios";
import AuthService from "@/service/AuthService";
import { ConfigProvider, Layout } from "antd";
import React, { useEffect } from "react";
import CustomHeader from "../components/CustomHeader";
import Footer from "../components/Footer";
import LoadingScreen from "./../components/LoadingScreen";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

const { Content } = Layout;

const Layout = (props) => {
  if (session.role.toLowerCase() == "admin" && router.pathname.includes("/admin"))
    return <AdminLayout Component={Component} pageProps={pageProps} />;
  if (
    session.role.toLowerCase() === "user" ||
    (session.role.toLowerCase() === "admin" && router.pathname.includes("/user"))
  )
    return (
      <>
        <CustomHeader />
        <Content className="site-layout">
          <Component {...pageProps} />
        </Content>
      </>
    );
};

export default Layout;
