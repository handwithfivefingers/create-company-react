import React, { forwardRef } from "react";
import { Form, Input, Select, Card } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
const DiaChiTruSoChinh = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="Đăng ký thay đổi địa chỉ trụ sở chính"
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Form.Item label="Tên doanh nghiệp" name={["change_info", "location", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "location", "mst"]}>
        <Input />
      </Form.Item>
      <Form.Item label="Địa chỉ trụ sở hiện tại">
        <Form.Item
          name={["change_info", "location", "old", "address"]}
          label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
        >
          <Input />
        </Form.Item>
        <Form.Item name={["change_info", "location", "old", "town"]} label="Xã/Phường/Thị Trấn">
          <Input />
        </Form.Item>
        <Form.Item name={["change_info", "location", "old", "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh">
          <Input />
        </Form.Item>
        <Form.Item name={["change_info", "location", "old", "city"]} label="Tỉnh/Thành phố">
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item name={["location", "new_location"]} label="Địa chỉ trụ sở sau khi thay đổi">
        <Form.Item
          name={["location", "new_location", "address"]}
          label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
        >
          <Input />
        </Form.Item>
        <Form.Item name={["location", "new_location", "town"]} label="Xã/Phường/Thị Trấn">
          <Input />
        </Form.Item>
        <Form.Item name={["location", "new_location", "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh">
          <Input />
        </Form.Item>
        <Form.Item name={["location", "new_location", "city"]} label="Tỉnh/Thành phố">
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item name={["location", "phone"]} label="Điện thoại">
        <Input />
      </Form.Item>
      <Form.Item name={["location", "inside"]} label="Doanh nghiệp nằm trong">
        <Select>
          <Select.Option value="Khu Công Nghiệp">Khu Công Nghiệp</Select.Option>
          <Select.Option value="Khu Chế Xuất">Khu Chế Xuất</Select.Option>
          <Select.Option value="Khu Kinh Tế">Khu Kinh Tế</Select.Option>
          <Select.Option value="Khu Công Nghệ Cao">Khu Công Nghệ Cao</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name={["location", "legal_person"]} label="Tên người đại diện pháp luật">
        <Input />
      </Form.Item>
      {/* </Form> */}
    </Form.Item>
  );
});

export default DiaChiTruSoChinh;
