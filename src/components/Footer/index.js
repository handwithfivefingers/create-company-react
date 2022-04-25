import React from "react";
import { Row, Col, Typography, Avatar, List } from "antd";
// import { List } from 'antd/lib/form/Form';
import styles from "./Footer.module.scss";
import clsx from "clsx";
import CCButton from "../Button";
const Footer = () => {
  const data = [
    {
      id: 1,
      name: "Twitter",
    },
    {
      id: 2,
      name: "Facebook",
    },
    {
      id: 3,
      name: "Instagram",
    },
  ];
  const data2 = [
    {
      id: 1,
      name: "Email Address",
      value: "handwithfivefinger",
    },
    {
      id: 2,
      name: "Phone Number",
      value: "0123456789",
    },
  ];
  return (
    <>
      <div className={clsx([styles.container])}>
        <div className="container">
          <Row gutter={[16, 12]} style={{ padding: 40 }}>
            <Col lg={12} md={12} sm={24} xs={24} align="center">
              <h4 style={{ fontSize: 22, color:'var(--text1)' }}>
                Gặp vấn đề trong quá trình đăng kí ?
              </h4>
              <p style={{ fontSize: 16 , color:'var(--text1)'}}> Hãy để chúng tôi giúp bạn</p>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className={styles.actionsBtn} align="center">
              <CCButton outline fill style={{ fontSize: 18, padding: "10px" }}>
                Hotline
              </CCButton>
              <CCButton
                outline
                style={{ fontSize: 18, padding: "10px", color: "#fff" }}
              >
                Email
              </CCButton>
            </Col>
          </Row>
        </div>
        <Row
          gutter={[16, 12]}
          style={{ background: "#333", padding: 12, margin: 0 }}
        >
          <Col span={24} align="center">
            <Typography.Paragraph style={{ margin: 0, color: "#fff" }}>
              Công ty TNHH Thành lập công ty Online - Giấy phép kinh doanh số:
              12312312 - Cấp ngày 17/11/2017
            </Typography.Paragraph>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Footer;
