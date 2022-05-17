import { Form, Input, Select, Button, Space, Row, Col, DatePicker } from "antd";
import React, { forwardRef, useState } from "react";
import CCInput from "src/components/CCInput";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./../styles.module.scss";
import clsx from "clsx";
import { makeid } from "src/helper/Common";
const { RangePicker } = DatePicker;
const BASE_FORM = ["pending", "cancel"];

const KinhDoanhLaiTruocThoiHan = forwardRef((props, ref) => {
  //   Nếu chọn “Toàn bộ công ty”, thỉ chỉ cần 2 field này (đang nằm cuối trang)
  // Đăng ký tiếp tục kinh doanh kể từ ngày/tháng/năm
  // Lý do tiếp tục kinh doanh
  const [objective, setObjective] = useState("");

  const handleChange = (val) => {
    console.log(val);
  };
  
  const handleDateChange = (date, dateString) => {
    ref.current.setFieldsValue({
      pending: {
        cancel: {
          time_range: {
            start: dateString?.[0],
            end: dateString?.[1],
          },
        },
      },
    });
  };
  return (
    <Form.Item
      label={<h4>Đăng ký kinh doanh lại trước thời hạn</h4>}
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
      <CCInput
        type="select"
        name={[...BASE_FORM, "obj"]}
        onChange={handleChange}
        label="Đối tượng tạm ngưng"
        options={[
          {
            name: "Toàn bộ công ty",
            value: "Toàn bộ công ty",
          },
          {
            name: "Chi nhánh/văn phòng đại diện/địa điểm kinh doanh",
            value: "Chi nhánh/văn phòng đại diện/địa điểm kinh doanh",
          },
        ]}
      />
      {objective === "Toàn bộ công ty" ? (
        ""
      ) : (
        <Row gutter={[12, 16]}>
          <ChiNhanh />
        </Row>
      )}

      <CCInput
        type="date-range"
        name={[...BASE_FORM, "time_range"]}
        label="Đăng ký tiếp tục kinh doanh kể từ ngày/tháng/năm"
        onChange={handleDateChange}
      />

      <Form.Item name={[...BASE_FORM, "reason"]} label="Lý do tiếp tục kinh doanh">
        <Input />
      </Form.Item>
    </Form.Item>
  );
});
export default KinhDoanhLaiTruocThoiHan;

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
