import { ConfigProvider } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import RouterContext, { RouterProvider } from 'src/helper/Context';
import { LAYOUT_ROUTER, UserRouter } from './contants/Route';
import { useAuth, useDetectLocation } from './helper/Hook';
import moment from 'moment';
import { CommonAction } from './store/actions';
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
  const dispatch = useDispatch();

  useEffect(() => {
    let { pathname } = location;
    if (route !== routeDetect) setRoute(routeDetect);
    if (location !== displayLocation && pathname === '/') setTransistionStage('fadeOut');
    changeTitle(pathname);
  }, [location]);

  const changeTitle = (pathname) => {
    let item = UserRouter.find((item) => item.path.includes(pathname));
    item && dispatch(CommonAction.titleChange(item.title));
  };

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
