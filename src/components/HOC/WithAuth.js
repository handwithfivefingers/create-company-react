import React, { Component, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "src/helper/Hook/useAuth";
import { Layout, Menu, Breadcrumb } from "antd";
import clsx from "clsx";
import AdminSidebar from "src/components/Admin/AdminSidebar";
import styles from "./styles.module.scss";
const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

export default function WithAuth(Component) {
  return function Authenticated(props) {
    return (
      <Layout className={styles.adminLayout}>
        <AdminSidebar />
        <Layout className={clsx(["site-layout", styles.adminSiteLayout])}>
          <Content className={clsx(styles.adminMainContent)}>
            <div className="site-layout-background">
              <Component {...props} />;
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Truyen Mai ©2019 </Footer>
        </Layout>
      </Layout>
    );
  };
}
