import React, { forwardRef, useState } from "react";
import { Form, Input, Select, Card, Row, Col, DatePicker, InputNumber } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
const ThongTinDangKyThue = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="Đăng ký thay đổi người đại diện theo pháp luật"
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Form.Item label="Tên doanh nghiệp" name={["tax", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["tax", "mst"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Địa chỉ nhận thông báo thuế" name={["tax", "address"]}>
        <Form.Item label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn">
          <Input />
        </Form.Item>

        <Form.Item label="Xã/Phường/Thị trấn" name={["tax", "town"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh" name={["tax", "district"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tỉnh/Thành phố" name={["tax", "city"]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Ngày bắt đầu hoạt động" name={["tax", "start_active"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Hình thức hạch toán" name={["tax", "accountting"]}>
        <Select>
          <Select.Option>Có báo cáo tài chính hợp nhất</Select.Option>
          <Select.Option>Hạch toán phụ thuộc</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Ngày, tháng bắt đầu và kết thúc niên độ kế toán">
        <Form.Item label="Bắt đầu từ ngày (chọn ngày/ tháng)" name={["tax", "start_date"]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Đến ngày (chọn ngày/ tháng)" name={["tax", "end_date"]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Tổng số lao động (điền số)" name={["tax", "employee"]}>
          <InputNumber />
        </Form.Item>
      </Form.Item>

      <Form.Item name={["tax", "active_BOT"]} label="Có hoạt động theo dự án BOT/BTO/BT/BOO, BLT, BTL, O&M không">
        <Select>
          <Select.Option>Có</Select.Option>
          <Select.Option>Không</Select.Option>
        </Select>
      </Form.Item>
      {/* </Form> */}
    </Form.Item>
  );
});

export default ThongTinDangKyThue;