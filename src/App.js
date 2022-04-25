import React, { useState, useEffect } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { LAYOUT_ROUTER } from "./contants/Route";
import { ConfigProvider, Layout } from "antd";
import { useAuth } from "./helper/Hook/useAuth";
import Footer from "./components/Footer";
import "./assets/css/styles.scss";
import "aos/dist/aos.css";
import CustomHeader from "src/components/CustomHeader";
ConfigProvider.config({
  theme: {
    primaryColor: "#cd2027",
  },
});
const { Content } = Layout;
const RouterComponent = (props) => {
  const Route = useRoutes(LAYOUT_ROUTER(props.auth));
  return Route;
};

function App(props) {
  const auth = useAuth();
  return (
    <div className="App">
      <Layout style={{ background: "#fff", minHeight: "100vh" }}>
        <ConfigProvider>
          <BrowserRouter>
            <CustomHeader auth={auth} />
            <Content className="site-layout">
              <RouterComponent auth={auth} />
            </Content>
          </BrowserRouter>
        </ConfigProvider>
        <Footer />
      </Layout>
    </div>
  );
}

export default App;
