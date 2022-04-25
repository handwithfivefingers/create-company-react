import React from "react";
import { Layout, Spin, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";
export default function LoadingScreen() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Result
        style={{ margin: "auto 0" }}
        icon={<></>}
        // title="Loading lần đầu sẽ tốn thời gian, những lần sau không cần nữa"
        extra={<Spin />}
      />
    </Layout>
  );
}
