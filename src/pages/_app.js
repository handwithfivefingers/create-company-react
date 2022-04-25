import React, { useEffect, useReducer, useState } from "react";
import { ConfigProvider } from "antd";
import { UserRouter } from "contants/Route";
import { SessionProvider } from "next-auth/react";
import Router, { useRouter } from "next/router";
import LoadingScreen from "./../components/LoadingScreen";
import LayoutEffect from "../LayoutEffect";
import "../assets/css/styles.scss";
import "aos/dist/aos.css";
const initState = {
  title: "",
  router: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_SUCCESS":
      let pathName = UserRouter.reduce((prev, current) => {
        if (current.path === action.title) {
          prev = current.name;
        }
        if (action.title?.includes(current.path)) {
          prev = current.name;
        }
        return prev;
      }, "");
      return {
        ...state,
        title: pathName,
      };
    default:
      return state;
  }
};

function MyApp({ Component, pageProps: { session, routing, ...pageProps } }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [headSub, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    dispatch({
      type: "CHANGE_SUCCESS",
      title: router.pathname,
      router: router.pathname,
    });
  }, [router]);

  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      dispatch({
        type: "CHANGE_SUCCESS",
        title: url,
      });
      setLoading(false);
    });
  }, [router.events]);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {/** Authenticate */}
      <ConfigProvider>
        {/** Layout */}
        {(loading && <LoadingScreen />) || (
          <LayoutEffect Component={Component} pageProps={pageProps} headSub={headSub} />
        )}
      </ConfigProvider>
    </SessionProvider>
  );
}

export default MyApp;
