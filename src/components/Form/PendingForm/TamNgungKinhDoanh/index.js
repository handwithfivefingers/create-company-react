import { Form, Input, Select } from "antd";
import React, { forwardRef } from "react";

const TamNgungKinhDoanh = forwardRef((ref, props) => {
  return (
    <>
      <Form.Item name={["pending", "company_name"]} label="Tên doanh nghiệp (ghi bằng chữ in hoa)">
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "mst"]} label="Mã số doanh nghiệp/Mã số thuế">
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "obj"]} label="Đối tượng tạm ngưng">
        <Select>
          <Select.Option value={1}>Toàn bộ công ty</Select.Option>
          <Select.Option value={2}>Chi nhánh/văn phòng đại diện/địa điểm kinh doanh</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name={["pending", "branch_name"]}
        label="Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)"
      >
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "resp_office"]} label="Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh">
        <Input />
      </Form.Item>
      <Form.Item label="Thêm đoạn text 'Vui lòng điền thông tin sau đây nếu Địa điểm kinh doanh của bạn trực thuộc chi nhánh'">
        <Form.Item name={["pending", "branch_name"]} label="Tên chi nhánh (optional)">
          <Input />
        </Form.Item>
        <Form.Item name={["pending", "branch_mst"]} label="Mã số chi nhánh/Mã số thuế của chi nhánh  (optional)">
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item
        name={["pending", "time_range"]}
        label="Thời gian đăng ký tạm ngưng (từ ngày/tháng/năm đến ngày/tháng/năm)"
      >
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "reason"]} label="Lý do tạm ngưng">
        <Input />
      </Form.Item>
      <Form.Item name={["pending", "org_person"]} label="Tên người đại diện pháp luật/người đứng đầu chi nhánh">
        <Input />
      </Form.Item>
    </>
  );
});

export default TamNgungKinhDoanh;
