import React, { forwardRef } from "react";
import { Form, Input, Select, Card, DatePicker } from "antd";
import styles from "./styles.module.scss";
import clsx from "clsx";

const DaiDienPhapLuat = forwardRef((props, ref) => {
  console.log(props);
  return (
    <Form.Item
      label="Đăng ký thay đổi người đại diện theo pháp luật"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label="Tên doanh nghiệp" name={["change_info", "legal_respon", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "legal_respon", "mst"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tên người đại diện pháp luật cũ" name={["change_info", "legal_respon", "old", "name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Chức danh người ĐDPL cũ" name={["change_info", "legal_respon", "old", "title"]}>
        <Select>
          <Select.Option value={1}>Chủ tịch công ty</Select.Option>

          <Select.Option value={2}>Giám đốc</Select.Option>

          <Select.Option value={3}>Tổng giám đốc</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Thông tin người đại diện theo pháp luật sau khi thay đổi">
        <Form.Item label="Họ và tên" name={["change_info", "legal_respon", "name"]}>
          <Input />
        </Form.Item>

        <Form.Item name={["change_info", "legal_respon", "gender"]} label="Giới tính: ">
          <Select>
            <Select.Option value={0}>Nữ</Select.Option>
            <Select.Option value={1}>Nam</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name={["legal_respon", "title"]} label="Chức danh">
          <Select>
            <Select.Option value={1}>Chủ tịch công ty</Select.Option>

            <Select.Option value={2}>Giám đốc</Select.Option>

            <Select.Option value={3}>Tổng giám đốc</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name={["legal_respon", "birth_day"]} label="Sinh ngày">
          <DatePicker />
        </Form.Item>

        <Form.Item name={["legal_respon", "per_type"]} label="Dân tộc:">
          <Input />
        </Form.Item>

        <Form.Item name={["legal_respon", "national"]} label="Quốc tịch">
          <Input />
        </Form.Item>

        <Form.Item name={["legal_respon", "doc_type"]} label="Giấy tờ pháp lý">
          <Select>
            <Select.Option value={1}>CMND</Select.Option>
            <Select.Option value={2}>CCCD</Select.Option>
            <Select.Option value={3}>Hộ chiếu</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name={["legal_respon", "doc_code"]} label="Số CMND/ CCCD/ Hộ chiếu">
          <Input />
        </Form.Item>

        <Form.Item name={["legal_respon", "doc_time_provide"]} label="Ngày cấp">
          <DatePicker />
        </Form.Item>

        <Form.Item name={["legal_respon", "doc_place_provide"]} label="Nơi cấp">
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ thường trú">
          <Form.Item name={["legal_respon", "reg_address"]} label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn">
            <Input />
          </Form.Item>
          <Form.Item name={["legal_respon", "town"]} label="Xã/Phường/Thị Trấn">
            <Input />
          </Form.Item>
          <Form.Item name={["legal_respon", "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh">
            <Input />
          </Form.Item>
          <Form.Item name={["legal_respon", "city"]} label="Tỉnh/Thành phố">
            <Input />
          </Form.Item>
        </Form.Item>
      </Form.Item>
    </Form.Item>
  );
});

export default DaiDienPhapLuat;
