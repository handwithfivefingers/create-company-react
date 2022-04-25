import { Layout, Menu, Breadcrumb } from "antd";
import clsx from "clsx";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import styles from "./styles.module.scss";
// import "./styles.scss";
const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const AdminLayout = ({ Component, pageProps }) => {
  return (
    <Layout className={styles.adminLayout}>
      <AdminSidebar />
      <Layout className={clsx(["site-layout", styles.adminSiteLayout])}>
        <Content className={clsx(styles.adminMainContent)}>
          <div className="site-layout-background">
            <Component {...pageProps} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Truyen Mai ©2019 </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
