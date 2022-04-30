import { Form, Input, Select } from "antd";
import React, { forwardRef } from "react";
import styles from "./../styles.module.scss";
import clsx from "clsx";
const KinhDoanhLaiTruocThoiHan = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="Đăng ký kinh doanh lại trước thời hạn"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item name={["pending", "cancel", "company_name"]} label="Tên doanh nghiệp (ghi bằng chữ in hoa)">
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "cancel", "mst"]} label="Mã số doanh nghiệp/Mã số thuế">
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "cancel", "obj"]} label="Đối tượng tạm ngưng">
        <Select>
          <Select.Option value={1}>Toàn bộ công ty</Select.Option>
          <Select.Option value={2}>Chi nhánh/văn phòng đại diện/địa điểm kinh doanh</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={["pending", "cancel", "branch_name"]}
        label="Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["pending", "cancel", "resp_office"]}
        label="Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh"
      >
        <Input />
      </Form.Item>
      <Form.Item label="Thêm đoạn text 'Vui lòng điền thông tin sau đây nếu Địa điểm kinh doanh của bạn trực thuộc chi nhánh'">
        <Form.Item name={["pending", "cancel", "branch_name"]} label="Tên chi nhánh (optional)">
          <Input />
        </Form.Item>
        <Form.Item
          name={["pending", "cancel", "branch_mst"]}
          label="Mã số chi nhánh/Mã số thuế của chi nhánh  (optional)"
        >
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item name={["pending", "cancel", "time_range"]} label="Đăng ký tiếp tục kinh doanh kể từ ngày/tháng/năm">
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "cancel", "reason"]} label="Lý do tiếp tục kinh doanh">
        <Input />
      </Form.Item>
    </Form.Item>
  );
});
export default KinhDoanhLaiTruocThoiHan;
