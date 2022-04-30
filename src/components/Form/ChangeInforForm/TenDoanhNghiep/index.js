import React, { forwardRef } from "react";
import { Form, Input, Select, Card } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
const TenDoanhNghiep = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="Đăng ký thay đổi tên doanh nghiệp"
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Form.Item label="Tên doanh nghiệp" name={["change_info", "name", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "name", "mst"]}>
        <Input />
      </Form.Item>
      <Form.Item label="Doanh nghiệp đăng ký thay đổi tên cơ sở" name={["change_info", "name", "base_type"]}>
        <Select>
          <Select.Option value="1">Đăng ký thay đổi trên cơ sở tách doanh nghiệp</Select.Option>
          <Select.Option value="2">Đăng ký thay đổi trên cơ sở sáp nhập doanh nghiệp</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label={"Thay đổi tên công ty thành"} name={["change_info", "name", "name_vi"]}>
        <Form.Item label="Tên công ty bằng tiếng Việt">
          <Input />
        </Form.Item>

        <Form.Item label="Tên công ty bằng tiếng nước ngoài" name={["change_info", "name", "name_en"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên công ty viết tắt" name={["change_info", "name", "name_etc"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên người đại diện pháp luật" name={["change_info", "name", "legal_person"]}>
          <Input />
        </Form.Item>
      </Form.Item>
      {/* </Form> */}
    </Form.Item>
  );
});

export default TenDoanhNghiep;
