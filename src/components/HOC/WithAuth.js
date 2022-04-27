import React, { Component, useState, useEffect } from "react";
import { useOutletContext, Navigate, useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import clsx from "clsx";
import AdminSidebar from "src/components/Admin/AdminSidebar";
import styles from "./styles.module.scss";
import UserSidebar from "src/components/User/UserSidebar";
import UserHeader from "src/components/User/UserHeader";
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

export default function WithAuth(Component, role) {
  return function Authenticated(props) {
    const collapsed = useSelector((state) => state.commonReducer.collapsed);
    if (!props.status) return <Navigate to="/" />;

    if (role === "admin") {
      return (
        <Layout className={styles.adminLayout}>
          <AdminSidebar />
          <Layout className={clsx(["site-layout", styles.adminSiteLayout])}>
            <Content className={clsx(styles.adminMainContent)}>
              <div className="site-layout-background">
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
        <Layout className={clsx(["site-layout", styles.siteLayout, ])}>
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
