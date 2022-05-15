import { DatePicker, Form, Input, Button } from "antd";
import clsx from "clsx";
import React, { forwardRef, useEffect } from "react";
import CCInput from "src/components/CCInput";
import styles from "./styles.module.scss";

const BASE_FORM = ["change_info", "legal_representative"];

const DaiDienPhapLuat = forwardRef((props, ref) => {
  console.log(props);
  useEffect(() => {
    ref.current.setFieldsValue({
      change_info: {
        legal_representative: {
          national: "Việt Nam",
        },
      },
    });
    // }
  }, [ref]);

  const handleFill = () => {
    if (!ref) return;
    let val = ref.current.getFieldsValue();
    let { reg_address, town, district, city } = val.change_info.legal_representative;

    ref.current.setFieldsValue({
      change_info: {
        legal_representative: {
          contact_reg_address: reg_address,
          contact_town: town,
          contact_district: district,
          contact_city: city,
        },
      },
    });
  };

  return (
    <Form.Item
      label={<h4>Đăng ký thay đổi người đại diện theo pháp luật</h4>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label="Tên doanh nghiệp" name={[...BASE_FORM, "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={[...BASE_FORM, "mst"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Tên người đại diện pháp luật cũ" name={[...BASE_FORM, "old_name"]}>
        <Input />
      </Form.Item>

      <CCInput
        type="select"
        name={[...BASE_FORM, "old_title"]}
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
        <Form.Item label="Họ và tên" name={[...BASE_FORM, "new_name"]}>
          <Input />
        </Form.Item>

        <CCInput
          type="select"
          name={[...BASE_FORM, "gender"]}
          label="Giới tính"
          options={[
            { value: "Nữ", name: "Nữ" },
            { value: "Nam", name: "Nam" },
          ]}
        />
        <CCInput
          type="select"
          name={[...BASE_FORM, "new_title"]}
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

        <Form.Item name={[...BASE_FORM, "birth_day"]} label="Sinh ngày">
          <DatePicker style={{ width: "100%" }} inputReadOnly />
        </Form.Item>

        <Form.Item name={[...BASE_FORM, "per_type"]} label="Dân tộc">
          <Input />
        </Form.Item>

        <Form.Item name={[...BASE_FORM, "national"]} label="Quốc tịch">
          <Input />
        </Form.Item>

        <CCInput
          type="select"
          name={[...BASE_FORM, "doc_type"]}
          label="Loại giấy tờ pháp lý"
          options={[
            { name: "CMND", value: "CMND" },
            { name: "CCCD", value: "CCCD" },
            { name: "Hộ chiếu", value: "Hộ chiếu" },
          ]}
        />

        <Form.Item name={[...BASE_FORM, "doc_code"]} label="Số CMND/ CCCD/ Hộ chiếu">
          <Input />
        </Form.Item>

        <Form.Item name={[...BASE_FORM, "doc_time_provide"]} label="Ngày cấp">
          <DatePicker style={{ width: "100%" }} inputReadOnly />
        </Form.Item>

        <Form.Item name={[...BASE_FORM, "doc_place_provide"]} label="Nơi cấp">
          <Input />
        </Form.Item>
        
        <Form.Item label="Địa chỉ thường trú">
          <Form.Item name={[...BASE_FORM, "reg_address"]} label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn">
            <Input />
          </Form.Item>
          <Form.Item name={[...BASE_FORM, "town"]} label="Xã/Phường/Thị Trấn">
            <Input />
          </Form.Item>
          <Form.Item name={[...BASE_FORM, "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh">
            <Input />
          </Form.Item>
          <Form.Item name={[...BASE_FORM, "city"]} label="Tỉnh/Thành phố">
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Địa chỉ liên lạc">
          <Button onClick={handleFill}>Tự động điền</Button>
          <Form.Item
            name={[...BASE_FORM, "contact_reg_address"]}
            label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
          >
            <Input />
          </Form.Item>
          <Form.Item name={[...BASE_FORM, "contact_town"]} label="Xã/Phường/Thị Trấn">
            <Input />
          </Form.Item>
          <Form.Item name={[...BASE_FORM, "contact_district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh">
            <Input />
          </Form.Item>
          <Form.Item name={[...BASE_FORM, "contact_city"]} label="Tỉnh/Thành phố">
            <Input />
          </Form.Item>
        </Form.Item>
      </Form.Item>
    </Form.Item>
  );
});

export default DaiDienPhapLuat;
