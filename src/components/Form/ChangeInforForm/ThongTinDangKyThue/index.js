import React, { forwardRef, useState } from "react";
import { Form, Input, Select, Card, Row, Col, DatePicker, InputNumber } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
const ThongTinDangKyThue = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="Thông báo thay đổi thông tin đăng ký thuế"
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Form.Item label="Tên doanh nghiệp" name={["change_info", "tax", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "tax", "mst"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Địa chỉ nhận thông báo thuế" name={["change_info", "tax", "address"]}>
        <Form.Item label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn">
          <Input />
        </Form.Item>

        <Form.Item label="Xã/Phường/Thị trấn" name={["change_info", "tax", "town"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh" name={["change_info", "tax", "district"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tỉnh/Thành phố" name={["change_info", "tax", "city"]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Ngày bắt đầu hoạt động" name={["change_info", "tax", "start_active"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Hình thức hạch toán" name={["change_info", "tax", "accountting"]}>
        <Select>
          <Select.Option>Có báo cáo tài chính hợp nhất</Select.Option>
          <Select.Option>Hạch toán phụ thuộc</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Ngày, tháng bắt đầu và kết thúc niên độ kế toán">
        <Form.Item label="Bắt đầu từ ngày (chọn ngày/ tháng)" name={["change_info", "tax", "start_date"]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Đến ngày (chọn ngày/ tháng)" name={["change_info", "tax", "end_date"]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Tổng số lao động (điền số)" name={["change_info", "tax", "employee"]}>
          <InputNumber />
        </Form.Item>
      </Form.Item>

      <Form.Item name={["change_info", "tax", "active_BOT"]} label="Có hoạt động theo dự án BOT/BTO/BT/BOO, BLT, BTL, O&M không">
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
