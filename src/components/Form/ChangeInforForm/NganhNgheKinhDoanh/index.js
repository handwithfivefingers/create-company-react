import React, { forwardRef, useState } from "react";
import { Form, Input, Select, Card, Row, Col, DatePicker, InputNumber } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
const NganhNgheKinhDoanh = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="Đăng ký thay đổi người đại diện theo pháp luật"
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Form.Item label="Tên doanh nghiệp" name={["company_career", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["company_career", "mst"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Bổ sung ngành, nghề kinh doanh" name={["company_career", "include"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Bỏ ngành, nghề kinh doanh" name={["company_career", "exclude"]}>
        <Input />
      </Form.Item>

      {/* <Form.Item label="Sửa đổi chi tiết ngành, nghề kinh doanh sau" name={[""]}>
        <Select>
          <Select.Option>....</Select.Option>
        </Select>
      </Form.Item> */}

      <Form.Item label="Tên người Đại diện pháp luật" name={["company_career", "legal_person"]}>
        <Input />
      </Form.Item>
      {/* </Form> */}
    </Form.Item>
  );
});

export default NganhNgheKinhDoanh;
