import React from "react";
import { Layout, Spin, Result } from "antd";

export default function LoadingScreen() {
  return (
    <Layout style={{ minHeight: "100vh", opacity: 0.5 }}>
      <Result style={{ margin: "auto 0" }} icon={<></>} extra={<Spin />} />
    </Layout>
  );
}
