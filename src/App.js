import { ConfigProvider, Layout } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, useRoutes, useLocation, useNavigate } from "react-router-dom";
import CustomHeader from "src/components/CustomHeader";
import LoadingScreen from "src/components/LoadingScreen";
import Footer from "./components/Footer";
import { LAYOUT_ROUTER } from "./contants/Route";
import { useAuth, useDetectLocation } from "./helper/Hook";
import { RouteAction } from "src/store/actions";
import RouterContext, { RouterProvider } from "src/helper/Context";
import moment from "moment";
import "aos/dist/aos.css";
import "./assets/css/styles.scss";
import datejs from "datejs";
ConfigProvider.config({
  theme: {
    primaryColor: "#cd2027",
  },
});

const RouterComponent = (props) => {
  let location = useLocation();

  const Route = useRoutes(LAYOUT_ROUTER(props.auth)); // status, role

  const routeDetect = useDetectLocation(location);

  const { route, setRoute } = useContext(RouterContext);
  const [displayLocation, setDisplayLocation] = useState(location);

  const [transitionStage, setTransistionStage] = useState("fadeIn");
  useEffect(() => {
    if (route !== routeDetect) setRoute(routeDetect);
  }, [location]);

  useEffect(() => {
    if (location !== displayLocation && location.pathname === "/") setTransistionStage("fadeOut");
  }, [location]);

  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}
    >
      {Route}
    </div>
  );
};

function App() {
  const auth = useAuth(); // custom Hook
  const [route, setRoute] = useState({
    to: "",
    from: "",
  });

  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    moment.defaultFormat = "YYYY-MM-DD";
  }, []);

  return (
    <div className="App">
      <RouterProvider value={{ route, setRoute: (val) => setRoute(val) }}>
        <ConfigProvider>
          {authReducer.authenticating && <LoadingScreen />}
          <BrowserRouter>
            <RouterComponent auth={auth} />
          </BrowserRouter>
        </ConfigProvider>
      </RouterProvider>
    </div>
  );
}

export default App;
