import { Layout, Menu } from "antd";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AdminSidebar from "src/components/Admin/AdminSidebar";
import UserHeader from "src/components/User/UserHeader";
import UserSidebar from "src/components/User/UserSidebar";
import styles from "./styles.module.scss";
import { BrowserRouter, useRoutes, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;
export default function WithAuth(Component, role) {
  return function Authenticated(props) {

    if (!props.status) {
      return <Navigate to="/" />;
    }

    if (role === "admin") {
      return (
        <Layout className={[styles.adminLayout]}>
          <AdminSidebar />
          <Layout className={clsx(["site-layout", styles.adminSiteLayout])}>
            <Content className={clsx([styles.adminMainContent])}>
              <div className={`site-layout-background`}>
                <Component {...props} />
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Truyen Mai ©2019 </Footer>
          </Layout>
        </Layout>
      );
    }

    return (
      <Layout className={styles.mainLayout}>
        <UserSidebar />
        <Layout className={clsx(["site-layout", styles.siteLayout])}>
          <Content className={clsx(styles.mainContent)}>
            <UserHeader className="site-layout-background" style={{ padding: 0 }} />
            <Component {...props} />
          </Content>
          <Footer style={{ textAlign: "center" }}>©2019 Created by Truyenmai</Footer>
        </Layout>
      </Layout>
    );
  };
}
