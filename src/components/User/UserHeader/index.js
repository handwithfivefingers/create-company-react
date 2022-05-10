import { PageHeader } from "antd";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import datejs from "datejs";
import styles from "./styles.module.scss";

const UserHeader = (props) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toString("HH:mm"));

  const commonReducer = useSelector((state) => state.commonReducer);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toString("HH:mm"));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageHeader
      ghost={false}
      className={styles.siteHeader}
      onBack={() => navigate(-1)}
      title={commonReducer?.title}
      subTitle="This is a subtitle"
      extra={[<ClockCircleOutlined key="clock-1" />, time]}
    />
  );
};

export default React.memo(UserHeader);
