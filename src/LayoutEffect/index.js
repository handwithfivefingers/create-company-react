// import axios from "./../config/axios";
import AuthService from "@/service/AuthService";
import { ConfigProvider, Layout } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CustomHeader from "../components/CustomHeader";
import Footer from "../components/Footer";
import LoadingScreen from "./../components/LoadingScreen";
import AdminLayout from "./AdminLayout";
import UserLayout from "./UserLayout";

const { Content } = Layout;

const LayoutEffect = ({ Component, pageProps, headSub }) => {
  const { data: session, status } = useSession();

  const router = useRouter();

  useEffect(() => {
    defaultSetting();
  }, [router]);

  const defaultSetting = () => {
    ConfigProvider.config({
      theme: {
        primaryColor: "#cd2027",
      },
    });
    AuthService.getSession().catch((err) => console.log(err));
  };

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "authenticated") {
    if (session.role.toLowerCase() == "admin" && router.pathname.includes("/admin"))
      return <AdminLayout Component={Component} pageProps={pageProps} />;
    if (
      session.role.toLowerCase() === "user" ||
      (session.role.toLowerCase() === "admin" && router.pathname.includes("/user"))
    )
      return <UserLayout Component={Component} pageProps={pageProps} headSub={headSub} />;
  }

  return (
    <>
      <Layout style={{ background: "#fff", minHeight: "100vh" }}>
        <CustomHeader />
        <Content className="site-layout">
          <Component {...pageProps} />
        </Content>
        <Footer />
      </Layout>
    </>
  );
};

export default LayoutEffect;
