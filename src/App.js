import { ConfigProvider, Layout } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, useRoutes } from "react-router-dom";
import CustomHeader from "src/components/CustomHeader";
import LoadingScreen from "src/components/LoadingScreen";
import Footer from "./components/Footer";
import { LAYOUT_ROUTER } from "./contants/Route";
import { useAuth } from "./helper/Hook/useAuth";

import "aos/dist/aos.css";
import "./assets/css/styles.scss";

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

function App() {
  const auth = useAuth();
  const authReducer = useSelector((state) => state.authReducer);

  return (
    <div className="App">
      <ConfigProvider>
        {authReducer.authenticating && <LoadingScreen />}
        <BrowserRouter>
          <RouterComponent auth={auth} />
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
