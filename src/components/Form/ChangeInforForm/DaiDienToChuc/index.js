import React, { forwardRef } from "react";
import { Form, Input, Select, Card } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";

const DaiDienToChuc = forwardRef((props, ref) => {
  return (
    <Form.Item
      label={<h4>Người đại diện theo ủy quyền của chủ sở hữu là tổ chức</h4>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label="Tên doanh nghiệp" name={["present_change", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["present_change", "mst"]}>
        <Input />
      </Form.Item>
    </Form.Item>
  );
});

export default DaiDienToChuc;
