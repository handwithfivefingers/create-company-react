import React, { forwardRef, useState } from "react";
import { Form, Input, Select, DatePicker, Button, Space, Row, Col } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import clsx from "clsx";
import styles from "../styles.module.scss";

const { RangePicker } = DatePicker;

const BASE_FORM = ["pending", "approve"];

const TamNgungKinhDoanh = forwardRef((props, ref) => {
  const [objective, setObjective] = useState("");
  const handleChange = (val, opt) => {
    setObjective(val);
  };
  return (
    <Form.Item
      label="Đăng ký tạm ngưng kinh doanh"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item name={[...BASE_FORM, "company_name"]} label="Tên doanh nghiệp (ghi bằng chữ in hoa)">
        <Input />
      </Form.Item>
      <Form.Item name={[...BASE_FORM, "mst"]} label="Mã số doanh nghiệp/Mã số thuế">
        <Input />
      </Form.Item>
      <Form.Item name={[...BASE_FORM, "obj"]} label="Đối tượng tạm ngưng">
        <Select onChange={handleChange}>
          <Select.Option value={"Toàn bộ công ty"}>Toàn bộ công ty</Select.Option>
          <Select.Option value={"Chi nhánh/văn phòng đại diện/địa điểm kinh doanh"}>
            Chi nhánh/văn phòng đại diện/địa điểm kinh doanh
          </Select.Option>
        </Select>
      </Form.Item>

      {objective === "Toàn bộ công ty" ? (
        ""
      ) : (
        <Row gutter={[12, 16]}>
          <ChiNhanh />
        </Row>
      )}

      {/** <<<<- Group*/}

      <Form.Item
        name={[...BASE_FORM, "time_range"]}
        label="Thời gian đăng ký tạm ngưng (từ ngày/tháng/năm đến ngày/tháng/năm)"
      >
        {/* <RangePicker style={{ width: "100%" }} inputReadOnly /> */}
        <Form.Item name={[...BASE_FORM, "time_range", "start"]}>
          <DatePicker style={{ width: "100%" }} inputReadOnly />
        </Form.Item>
        <Form.Item name={[...BASE_FORM, "time_range", "end"]}>
          <DatePicker style={{ width: "100%" }} inputReadOnly />
        </Form.Item>
      </Form.Item>
      <Form.Item name={[...BASE_FORM, "reason"]} label="Lý do tạm ngưng">
        <Input />
      </Form.Item>
      <Form.Item name={[...BASE_FORM, "org_person"]} label="Tên người đại diện pháp luật/người đứng đầu chi nhánh">
        <Input />
      </Form.Item>
    </Form.Item>
  );
});

export default TamNgungKinhDoanh;

const ChiNhanh = () => {
  return (
    <>
      <Form.List
        name={[...BASE_FORM, "branch"]}
        initialValue={[
          {
            branch_name: "",
            resp_office: "",
            branch_name_opt: "",
            branch_mst_opt: "",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields?.map((field, i) => (
              <>
                <Col lg={12} md={12} sm={24} xs={24} key={[field, i + 1]}>
                  <Form.Item
                    {...field}
                    name={[field.name, "branch_name"]}
                    label="Tên chi nhánh/văn phòng đại diện/địa điểm kinh doanh (ghi bằng chữ in hoa)"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, "resp_office"]}
                    label="Mã số thuế chi nhánh/văn phòng đại diện/địa điểm kinh doanh"
                  >
                    <Input />
                  </Form.Item>

                  {/** Group ->>>> */}

                  <Form.Item label="Vui lòng điền thông tin sau đây nếu Địa điểm kinh doanh của bạn trực thuộc chi nhánh">
                    <Form.Item {...field} name={[field.name, "branch_name_opt"]} label="Tên chi nhánh (nếu có)">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "branch_mst_opt"]}
                      label="Mã số chi nhánh/Mã số thuế của chi nhánh  (nếu có)"
                    >
                      <Input />
                    </Form.Item>
                  </Form.Item>

                  <Space style={{ display: "flex", justifyContent: "center" }}>
                    {fields.length <= 1 ? "" : <MinusCircleOutlined onClick={() => remove(field.name)} />}
                  </Space>
                </Col>
              </>
            ))}

            {fields.length >= 5 ? (
              ""
            ) : (
              <Form.Item label="">
                <Button type="dashed" onClick={add} block icon={<PlusOutlined />}>
                  Thêm chi nhánh
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
    </>
  );
};
