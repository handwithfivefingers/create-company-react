import React, { forwardRef } from "react";
import { Form, Input, Select, Card } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
const TenDoanhNghiep = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="ĐĂNG KÝ THAY ĐỔI TÊN DOANH NGHIỆP"
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Form.Item label="Tên doanh nghiệp" name={["name", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["name", "mst"]}>
        <Input />
      </Form.Item>
      <Form.Item label="Doanh nghiệp đăng ký thay đổi tên cơ sở" name={["name", "base_type"]}>
        <Select>
          <Select.Option value="1">Đăng ký thay đổi trên cơ sở tách doanh nghiệp</Select.Option>
          <Select.Option value="2">Đăng ký thay đổi trên cơ sở sáp nhập doanh nghiệp</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label={"Thay đổi tên công ty thành"} name={["name", "name_vi"]}>
        <Form.Item label="Tên công ty bằng tiếng Việt">
          <Input />
        </Form.Item>

        <Form.Item label="Tên công ty bằng tiếng nước ngoài" name={["name", "name_en"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên công ty viết tắt" name={["name", "name_etc"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tên người đại diện pháp luật" name={["name", "legal_person"]}>
          <Input />
        </Form.Item>
      </Form.Item>
      {/* </Form> */}
    </Form.Item>
  );
});

export default TenDoanhNghiep;
