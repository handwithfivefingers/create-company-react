import React, { forwardRef, useState, useEffect } from "react";
import { Form, Input, Select, Card, Row, Col, DatePicker, InputNumber } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import HomepageService from "src/service/GlobalService";
import clsx from "clsx";

const BASE_FORM = ["change_info", "company_career"];
const NganhNgheKinhDoanh = forwardRef((props, ref) => {
  const [career, setCareer] = useState([]);

  useEffect(() => {
    onFetchCareer();
  }, []);

  const onFetchCareer = async () => {
    try {
      const res = await HomepageService.fetchCareer();
      if (res) {
        setCareer(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form.Item
      label={<h4>Thông báo thay đổi ngành, nghề kinh doanh</h4>}
      // bordered={false}
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

      <Form.Item
        label="Bổ sung ngành, nghề kinh doanh"
        name={[...BASE_FORM, "include"]}
        placeholder="Gõ tên ngành hoặc mã ngành"
      >
        <Select
          showSearch
          allowClear
          mode="multiple"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onClear={() => {
            // formRef.current.setFieldsValue({ career_id: "" });
            onFetchCareer();
          }}
        >
          {career.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.code}-{item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Bỏ ngành, nghề kinh doanh"
        name={[...BASE_FORM, "exclude"]}
        placeholder="Gõ tên ngành hoặc mã ngành"
      >
        <Select
          showSearch
          allowClear
          mode="multiple"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onClear={() => {
            // formRef.current.setFieldsValue({ career_id: "" });
            onFetchCareer();
          }}
        >
          {career.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.code}-{item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* <Form.Item label="Bổ sung ngành, nghề kinh doanh" name={[...BASE_FORM, "include"]}>
        <Input />
      </Form.Item> */}
      {/* 
      <Form.Item label="Bỏ ngành, nghề kinh doanh" name={[...BASE_FORM, "exclude"]}>
        <Input />
      </Form.Item> */}
      <Form.Item
        label="Sửa đổi chi tiết ngành, nghề kinh doanh sau"
        name={[...BASE_FORM, "detail_after"]}
        placeholder="Gõ tên ngành hoặc mã ngành"
      >
        <Select
          showSearch
          allowClear
          mode="multiple"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onClear={() => {
            // formRef.current.setFieldsValue({ career_id: "" });
            onFetchCareer();
          }}
        >
          {career.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.code}-{item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* <Form.Item label="Sửa đổi chi tiết ngành, nghề kinh doanh sau" name={[""]}>
        <Select>
          <Select.Option>....</Select.Option>
        </Select>
      </Form.Item> */}

      <Form.Item label="Tên người Đại diện pháp luật" name={[...BASE_FORM, "legal_person"]}>
        <Input />
      </Form.Item>
      {/* </Form> */}
    </Form.Item>
  );
});

export default NganhNgheKinhDoanh;
