import React, { useReducer, useEffect } from "react";
import { Menu, Layout, Dropdown, Button, PageHeader } from "antd";
import Link from "next/link";
import styles from "./styles.module.scss";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { RiArrowLeftCircleLine } from "react-icons/ri";
import { initState, reducer } from "pages/_app";

const UserHeader = (props) => {
  const [head, dispatch] = useReducer(reducer, initState);
  const router = useRouter();
  useEffect(() => {
    // console.log("render header", title);
    console.log("header", head, props);
  }, []);
  return (
    <div className={styles.headerMenu}>
      <PageHeader
        className={styles.siteHeader}
        onBack={() => router.back()}
        title={props.headSub.title}
        subTitle="This is a subtitle"
      />
    </div>
  );
};

export default UserHeader;
