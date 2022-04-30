import { Form, Input, Select } from "antd";
import React, { forwardRef } from "react";
import clsx from "clsx";
import styles from "../styles.module.scss";

const TamNgungKinhDoanh = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="Đăng ký tạm ngưng kinh doanh"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item name={["pending", "approve", "company_name"]} label="Tên doanh nghiệp (ghi bằng chữ in hoa)">
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "approve", "mst"]} label="Mã số doanh nghiệp/Mã số thuế">
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "approve", "obj"]} label="Đối tượng tạm ngưng">
        <Select>
          <Select.Option value={1}>Toàn bộ công ty</Select.Option>
          <Select.Option value={2}>Chi nhánh/văn phòng đại diện/địa điểm kinh doanh</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={["pending", "approve", "branch_name"]}
        label="Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["pending", "approve", "resp_office"]}
        label="Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh"
      >
        <Input />
      </Form.Item>
      <Form.Item label="Thêm đoạn text 'Vui lòng điền thông tin sau đây nếu Địa điểm kinh doanh của bạn trực thuộc chi nhánh'">
        <Form.Item name={["pending", "approve", "branch_name"]} label="Tên chi nhánh (optional)">
          <Input />
        </Form.Item>
        <Form.Item
          name={["pending", "approve", "branch_mst"]}
          label="Mã số chi nhánh/Mã số thuế của chi nhánh  (optional)"
        >
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item
        name={["pending", "approve", "time_range"]}
        label="Thời gian đăng ký tạm ngưng (từ ngày/tháng/năm đến ngày/tháng/năm)"
      >
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "approve", "reason"]} label="Lý do tạm ngưng">
        <Input />
      </Form.Item>
      <Form.Item
        name={["pending", "approve", "org_person"]}
        label="Tên người đại diện pháp luật/người đứng đầu chi nhánh"
      >
        <Input />
      </Form.Item>
    </Form.Item>
  );
});

export default TamNgungKinhDoanh;
