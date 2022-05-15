import React, { forwardRef } from "react";
import { Form, Input, Select, Card } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";

const BASE_FORM = ["change_info", "location"];
const DiaChiTruSoChinh = forwardRef((props, ref) => {
  return (
    <Form.Item
      label={<h4>Đăng ký thay đổi địa chỉ trụ sở chính</h4>}
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
      <Form.Item label={<h4>Địa chỉ trụ sở hiện tại</h4>}>
        <Form.Item name={[...BASE_FORM, "old", "address"]} label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn">
          <Input />
        </Form.Item>
        <Form.Item name={[...BASE_FORM, "old", "town"]} label="Xã/Phường/Thị Trấn">
          <Input />
        </Form.Item>
        <Form.Item name={[...BASE_FORM, "old", "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh">
          <Input />
        </Form.Item>
        <Form.Item name={[...BASE_FORM, "old", "city"]} label="Tỉnh/Thành phố">
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item name={[...BASE_FORM, "new_location"]} label={<h4>Địa chỉ trụ sở sau khi thay đổi</h4>}>
        <Form.Item
          name={[...BASE_FORM, "new_location", "address"]}
          label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
        >
          <Input />
        </Form.Item>
        <Form.Item name={[...BASE_FORM, "new_location", "town"]} label="Xã/Phường/Thị Trấn">
          <Input />
        </Form.Item>
        <Form.Item name={[...BASE_FORM, "new_location", "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh">
          <Input />
        </Form.Item>
        <Form.Item name={[...BASE_FORM, "new_location", "city"]} label="Tỉnh/Thành phố">
          <Input />
        </Form.Item>
      </Form.Item>

      <Form.Item name={[...BASE_FORM, "phone"]} label="Điện thoại">
        <Input />
      </Form.Item>
      <Form.Item name={[...BASE_FORM, "inside"]} label="Doanh nghiệp nằm trong">
        <Select>
          <Select.Option value="Khu Công Nghiệp">Khu Công Nghiệp</Select.Option>
          <Select.Option value="Khu Chế Xuất">Khu Chế Xuất</Select.Option>
          <Select.Option value="Khu Kinh Tế">Khu Kinh Tế</Select.Option>
          <Select.Option value="Khu Công Nghệ Cao">Khu Công Nghệ Cao</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name={[...BASE_FORM, "legal_person"]} label="Tên người đại diện pháp luật">
        <Input />
      </Form.Item>
      {/* </Form> */}
    </Form.Item>
  );
});

export default DiaChiTruSoChinh;
