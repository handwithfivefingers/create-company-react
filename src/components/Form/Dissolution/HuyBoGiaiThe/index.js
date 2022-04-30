import { Form, Input, Select } from "antd";
import React, { forwardRef } from "react";
import clsx from "clsx";
import styles from "../styles.module.scss";

const HuyBoGiaiThe = (props) => {
  return (
    <Form.Item
      label="Hủy bỏ giải thể"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item name={["dissolution", "cancel", "company_name"]} label="Tên doanh nghiệp (ghi bằng chữ in hoa)">
        <Input />
      </Form.Item>
      <Form.Item name={["dissolution", "cancel", "mst"]} label="Mã số doanh nghiệp/Mã số thuế">
        <Input />
      </Form.Item>
    </Form.Item>
  );
};

export default HuyBoGiaiThe;
