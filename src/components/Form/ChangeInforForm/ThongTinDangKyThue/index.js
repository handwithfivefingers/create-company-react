import { Form } from "antd";
import clsx from "clsx";
import React, { forwardRef } from "react";
import CCInput from "src/components/CCInput";
import styles from "../DaiDienPhapLuat/styles.module.scss";

const BASE_FORM = ["change_info", "tax"];

const ThongTinDangKyThue = forwardRef((props, ref) => {
  const accounting = [
    {
      name: "Có báo cáo tài chính hợp nhất",
      value: "Có báo cáo tài chính hợp nhất",
    },
    {
      name: "Hạch toán phụ thuộc",
      value: "Hạch toán phụ thuộc",
    },
  ];
  const active_bot = [
    {
      name: "Không",
      value: 0,
    },
    {
      name: "Có",
      value: 1,
    },
  ];
  return (
    <Form.Item
      label={<h4>Thông báo thay đổi thông tin đăng ký thuế</h4>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <CCInput label="Tên doanh nghiệp" name={[...BASE_FORM, "company_name"]} />

      <CCInput label="Mã số doanh nghiệp/ mã số thuế" name={[...BASE_FORM, "mst"]} />

      <CCInput label="Họ và tên Giám đốc/Tổng giám đốc" name={[...BASE_FORM, "name"]} />

      <CCInput label="Điện thoại" name={[...BASE_FORM, "phone"]} />

      <Form.Item label="Địa chỉ nhận thông báo thuế">
        <CCInput label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn" name={[...BASE_FORM, "address"]} />

        <CCInput label="Xã/Phường/Thị trấn" name={[...BASE_FORM, "town"]} />

        <CCInput label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh" name={[...BASE_FORM, "district"]} />

        <CCInput label="Tỉnh/Thành phố" name={[...BASE_FORM, "city"]} />
      </Form.Item>

      <CCInput label="Ngày bắt đầu hoạt động" name={[...BASE_FORM, "start_active"]} type="date" />

      <CCInput label="Hình thức hạch toán" name={[...BASE_FORM, "accounting"]} type="select" options={accounting} />

      <Form.Item label="Ngày, tháng bắt đầu và kết thúc niên độ kế toán">
        <CCInput label="Bắt đầu từ ngày (chọn ngày/ tháng)" name={[...BASE_FORM, "start_date"]} />

        <CCInput label="Đến ngày (chọn ngày/ tháng)" name={[...BASE_FORM, "end_date"]} type="date" />

        <CCInput label="Tổng số lao động" name={[...BASE_FORM, "employee"]} type="number" />
      </Form.Item>

      <CCInput
        name={[...BASE_FORM, "active_BOT"]}
        label="Có hoạt động theo dự án BOT/BTO/BT/BOO, BLT, BTL, O&M không"
        options={active_bot}
        type="select"
      />
    </Form.Item>
  );
});

export default ThongTinDangKyThue;
