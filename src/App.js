import { ConfigProvider } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import RouterContext, { RouterProvider } from 'src/helper/Context';
import { LAYOUT_ROUTER } from './contants/Route';
import { useAuth, useDetectLocation } from './helper/Hook';
import moment from 'moment';

import 'aos/dist/aos.css';
import './assets/css/styles.scss';

ConfigProvider.config({
  theme: {
    primaryColor: '#cd2027',
    // primaryColor: "#791314",
  },
});
moment.defaultFormat = 'DD/MM/YYYY';

const RouterComponent = (props) => {
  let location = useLocation();

  const Route = useRoutes(LAYOUT_ROUTER(props.auth)); // status, role

  const routeDetect = useDetectLocation(location);

  const { route, setRoute } = useContext(RouterContext);
  const [displayLocation, setDisplayLocation] = useState(location);

  const [transitionStage, setTransistionStage] = useState('fadeIn');
  useEffect(() => {
    if (route !== routeDetect) setRoute(routeDetect);
  }, [location]);

  useEffect(() => {
    if (location !== displayLocation && location.pathname === '/') setTransistionStage('fadeOut');
  }, [location]);

  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransistionStage('fadeIn');
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
    to: '',
    from: '',
  });

  const authReducer = useSelector((state) => state.authReducer);

  return (
    <div className="App">
      <ConfigProvider>
        <RouterProvider value={{ route, setRoute: (val) => setRoute(val) }}>
          {authReducer.authenticating && <LoadingScreen />}
          <BrowserRouter>
            <RouterComponent auth={auth} />
          </BrowserRouter>
        </RouterProvider>
      </ConfigProvider>
    </div>
  );
}

export default App;
