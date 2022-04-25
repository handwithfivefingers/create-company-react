import { PageHeader } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

const UserHeader = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("header", head, props);
  }, []);
  return (
    <div className={styles.headerMenu}>
      <PageHeader
        className={styles.siteHeader}
        onBack={() => navigate(-1)}
        title={props?.headSub?.title}
        subTitle="This is a subtitle"
      />
    </div>
  );
};

export default UserHeader;
