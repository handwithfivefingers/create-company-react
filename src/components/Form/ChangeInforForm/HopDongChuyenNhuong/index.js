import React, { forwardRef, useState } from "react";
import { Form, Input, Select, Card, Row, Col, DatePicker, InputNumber } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
import CCInput from "src/components/CCInput";
const HopDongChuyenNhuong = forwardRef((props, ref) => {
  const [sohuu, setSohuu] = useState();

  const renderFormFieldByValue = (val) => {
    let xhtml = null;
    if (sohuu === 1) {
      xhtml = // chủ sở hữu là cá nhân
        (
          <Row>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info"]} label="Họ và tên">
                <Select>
                  <Select.Option value={0}>Nữ</Select.Option>
                  <Select.Option value={1}>Nam</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info"]} label="Ngày sinh">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              {/* <Form.Item name={["change_info"]} label="Loại giấy tờ pháp lý">
                <Select>
                  <Select.Option value={0}>CMND</Select.Option>
                  <Select.Option value={1}>CCCD</Select.Option>
                  <Select.Option value={1}>Hộ chiếu</Select.Option>
                </Select>
              </Form.Item> */}
              <CCInput
                type="select"
                name={["change_info"]}
                label="Loại giấy tờ pháp lý"
                options={[
                  { name: "CMND", value: "CMND" },
                  { name: "CCCD", value: "CCCD" },
                  { name: "Hộ chiếu", value: "Hộ chiếu" },
                ]}
              />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info"]} label="Số giấy tờ pháp lý">
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info"]} label="Ngày cấp">
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info"]} label="Nơi cấp">
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info"]} label="Địa chỉ liên lạc">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        );
    } else {
      // Chủ sở hữu là tổ chức
      xhtml = (
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={["change_info"]} label="Tên doanh nghiệp">
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={["change_info"]} label="Mã số doanh nghiệp">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Địa chỉ trụ sở chính">
              <Form.Item label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn">
                <Input />
              </Form.Item>
              <Form.Item label="Xã/Phường/Thị trấn">
                <Input />
              </Form.Item>
              <Form.Item label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh">
                <Input />
              </Form.Item>
              <Form.Item label="Tỉnh/Thành phố">
                <Input />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Người đại diện theo pháp luật của công ty">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Chức danh">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Bên A hiện đang sở hữu phần vốn góp là (Field điền số vốn)">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={24}>
            {/* <Form.Item label="Người đại diện theo pháp luật của công ty">
              <Select>
                <Select.Option value={1}>Chuyển nhượng toàn bộ phần vốn góp</Select.Option>
                <Select.Option value={2}>Chuyển nhượng một phần vốn góp</Select.Option>
              </Select>
            </Form.Item> */}
            <CCInput
              type="select"
              name={["change_info"]}
              label="Người đại diện theo pháp luật của công ty"
              options={[
                { name: "Chuyển nhượng toàn bộ phần vốn góp", value: "Chuyển nhượng toàn bộ phần vốn góp" },
                { name: "Chuyển nhượng một phần vốn góp", value: "Chuyển nhượng một phần vốn góp" },
              ]}
            />
          </Col>
          {/** Display when selected === 2 */}
          <Col span={24}>
            <Form.Item label="Phần vốn góp bên A muốn chuyển nhượng (field điền số vốn)">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Giá chuyển nhượng">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Thời điểm hoàn thành việc chuyển nhượng (Chọn Ngày/ tháng/ năm)">
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
      );
    }
    return xhtml;
  };

  return (
    <Form.Item
      label="Đăng ký thay đổi người đại diện theo pháp luật"
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Form.Item label="Tên doanh nghiệp">
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế">
        <Input />
      </Form.Item>

      <Form.Item label="Bên chuyển nhượng phần góp vốn (bên A)">
        <Form.Item label="Chủ sở hữu">
          <Select onChange={(e) => setSohuu(e)}>
            <Select.Option value={1}>Trường hợp chủ sở hữu là cá nhân</Select.Option>
            <Select.Option value={2}>Trường hợp chủ sở hữu là tổ chức</Select.Option>
          </Select>
        </Form.Item>
        {renderFormFieldByValue(sohuu)}
      </Form.Item>
      {/* </Form> */}
    </Form.Item>
  );
});

export default HopDongChuyenNhuong;
