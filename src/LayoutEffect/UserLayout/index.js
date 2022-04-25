import { Layout, Menu, Breadcrumb } from "antd";
import Router from "next/router";
import { useState } from "react";
import UserSidebar from "@/components/User/UserSidebar";
import UserHeader from "@/components/User/UserHeader";
import styles from "./styles.module.scss";
import clsx from "clsx";

const { Content, Footer } = Layout;

const UserLayout = ({ Component, pageProps, headSub }) => {
  console.log("sider");
  return (
    <Layout className={styles.mainLayout}>
      <UserSidebar />
      <Layout className={clsx(["site-layout", styles.siteLayout])}>
        <UserHeader className="site-layout-background" style={{ padding: 0 }} headSub={headSub} />
        <Content className={clsx(styles.mainContent)}>
          <div className={clsx["site-layout-background"]}>
            <Component {...pageProps} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>©2019 Created by Truyenmai</Footer>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
