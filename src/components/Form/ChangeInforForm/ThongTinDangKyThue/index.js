import React, { forwardRef, useState } from "react";
import { Form, Input, Select, Card, Row, Col, DatePicker, InputNumber } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";

const BASE_FORM = ["change_info", "tax"];

const ThongTinDangKyThue = forwardRef((props, ref) => {
  return (
    <Form.Item
      label={<h4>Thông báo thay đổi thông tin đăng ký thuế</h4>}
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Form.Item label="Tên doanh nghiệp" name={[...BASE_FORM, "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={[...BASE_FORM, "mst"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Địa chỉ nhận thông báo thuế" name={[...BASE_FORM, "address"]}>
        <Form.Item label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn">
          <Input />
        </Form.Item>

        <Form.Item label="Xã/Phường/Thị trấn" name={[...BASE_FORM, "town"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh" name={[...BASE_FORM, "district"]}>
          <Input />
        </Form.Item>

        <Form.Item label="Tỉnh/Thành phố" name={[...BASE_FORM, "city"]}>
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Ngày bắt đầu hoạt động" name={[...BASE_FORM, "start_active"]}>
        {/* <Input /> */}
        <DatePicker inputReadOnly style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Hình thức hạch toán" name={[...BASE_FORM, "accounting"]}>
        <Select>
          <Select.Option>Có báo cáo tài chính hợp nhất</Select.Option>
          <Select.Option>Hạch toán phụ thuộc</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Ngày, tháng bắt đầu và kết thúc niên độ kế toán">
        <Form.Item label="Bắt đầu từ ngày (chọn ngày/ tháng)" name={[...BASE_FORM, "start_date"]}>
          {/* <DatePicker /> */}
          <DatePicker inputReadOnly style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Đến ngày (chọn ngày/ tháng)" name={[...BASE_FORM, "end_date"]}>
          {/* <DatePicker /> */}
          <DatePicker inputReadOnly style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Tổng số lao động" name={[...BASE_FORM, "employee"]}>
          <InputNumber />
        </Form.Item>
      </Form.Item>

      <Form.Item
        name={[...BASE_FORM, "active_BOT"]}
        label="Có hoạt động theo dự án BOT/BTO/BT/BOO, BLT, BTL, O&M không"
      >
        <Select>
          <Select.Option value={1}>Có</Select.Option>
          <Select.Option value={0}>Không</Select.Option>
        </Select>
      </Form.Item>
      {/* </Form> */}
    </Form.Item>
  );
});

export default ThongTinDangKyThue;
