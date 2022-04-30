import React, { forwardRef } from "react";
import { Form, Input, Select, Card, DatePicker } from "antd";
import styles from "./styles.module.scss";
import clsx from "clsx";
import CCInput from "src/components/CCInput";

const DaiDienPhapLuat = forwardRef((props, ref) => {
  console.log(props);
  return (
    <Form.Item
      label="Đăng ký thay đổi người đại diện theo pháp luật"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label="Tên doanh nghiệp" name={["change_info", "legal_representative", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "legal_representative", "mst"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tên người đại diện pháp luật cũ" name={["change_info", "legal_representative", "old_name"]}>
        <Input />
      </Form.Item>

      <CCInput
        type="select"
        name={["change_info", "legal_representative", "old_title"]}
        label="Chức danh"
        options={[
          {
            value: "Chủ tịch công ty",
            name: "Chủ tịch công ty",
          },
          {
            value: "Giám đốc",
            name: "Giám đốc",
          },
          {
            value: "Tổng giám đốc",
            name: "Tổng giám đốc",
          },
        ]}
      />

      <Form.Item label="Thông tin người đại diện theo pháp luật sau khi thay đổi">
        <Form.Item label="Họ và tên" name={["change_info", "legal_representative", "new_name"]}>
          <Input />
        </Form.Item>

        <CCInput
          type="select"
          name={["change_info", "legal_representative", "gender"]}
          label="Giới tính"
          options={[
            { value: "Nữ", name: "Nữ" },
            { value: "Nam", name: "Nam" },
          ]}
        />
        <CCInput
          type="select"
          name={["change_info", "legal_representative", "new_title"]}
          label="Chức danh"
          options={[
            {
              value: "Chủ tịch công ty",
              name: "Chủ tịch công ty",
            },
            {
              value: "Giám đốc",
              name: "Giám đốc",
            },
            {
              value: "Tổng giám đốc",
              name: "Tổng giám đốc",
            },
          ]}
        />

        <Form.Item name={["change_info", "legal_representative", "birth_day"]} label="Sinh ngày">
          <DatePicker />
        </Form.Item>

        <Form.Item name={["change_info", "legal_representative", "per_type"]} label="Dân tộc">
          <Input />
        </Form.Item>

        <Form.Item name={["change_info", "legal_representative", "national"]} label="Quốc tịch">
          <Input />
        </Form.Item>

        <CCInput
          type="select"
          name={["change_info", "legal_representative", "doc_type"]}
          label="Loại giấy tờ pháp lý"
          options={[
            { name: "CMND", value: "CMND" },
            { name: "CCCD", value: "CCCD" },
            { name: "Hộ chiếu", value: "Hộ chiếu" },
          ]}
        />

        <Form.Item name={["change_info", "legal_representative", "doc_code"]} label="Số CMND/ CCCD/ Hộ chiếu">
          <Input />
        </Form.Item>

        <Form.Item name={["change_info", "legal_representative", "doc_time_provide"]} label="Ngày cấp">
          <DatePicker />
        </Form.Item>

        <Form.Item name={["change_info", "legal_representative", "doc_place_provide"]} label="Nơi cấp">
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ thường trú">
          <Form.Item
            name={["change_info", "legal_representative", "reg_address"]}
            label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
          >
            <Input />
          </Form.Item>
          <Form.Item name={["change_info", "legal_representative", "town"]} label="Xã/Phường/Thị Trấn">
            <Input />
          </Form.Item>
          <Form.Item
            name={["change_info", "legal_representative", "district"]}
            label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh"
          >
            <Input />
          </Form.Item>
          <Form.Item name={["change_info", "legal_representative", "city"]} label="Tỉnh/Thành phố">
            <Input />
          </Form.Item>
        </Form.Item>
      </Form.Item>
    </Form.Item>
  );
});

export default DaiDienPhapLuat;
