import { Form, Input, Select } from "antd";
import React, { forwardRef } from "react";
import clsx from "clsx";
import styles from "../styles.module.scss";

const GiaiThe = (props) => {
  return (
    <Form.Item
      label="Giải thể"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item name={["dissolution", "approve", "company_name"]} label="Tên doanh nghiệp (ghi bằng chữ in hoa)">
        <Input />
      </Form.Item>
      <Form.Item name={["dissolution", "approve", "mst"]} label="Mã số doanh nghiệp/Mã số thuế">
        <Input />
      </Form.Item>
      <Form.Item name={["dissolution", "approve", "company_address"]} label="Địa chỉ trụ sở chính">
        <Input />
      </Form.Item>

      <Form.Item name={["dissolution", "approve", "reason"]} label="Lý do giải thể">
        <Input />
      </Form.Item>
      <Form.Item name={["dissolution", "approve", "representative"]} label="Ông (bà) Chủ sở hữu/đại diện chủ sở hữu">
        <Input />
      </Form.Item>
    </Form.Item>
  );
};

export default GiaiThe;
