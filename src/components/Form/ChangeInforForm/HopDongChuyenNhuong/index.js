import React, { forwardRef, useState } from "react";
import { Form, Input, Select, Card, Row, Col, DatePicker, InputNumber } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
import CCInput from "src/components/CCInput";
const HopDongChuyenNhuong = forwardRef((props, ref) => {
  const [sohuu, setSohuu] = useState();
  const [type, setType] = useState("");

  const renderFormFieldByValue = (val) => {
    let xhtml = null;
    if (sohuu === "personal") {
      xhtml = // chủ sở hữu là cá nhân
        (
          <Row>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info", "transfer_contract", "A", "personal", "name"]} label="Họ và tên">
                <Select>
                  <Select.Option value={0}>Nữ</Select.Option>
                  <Select.Option value={1}>Nam</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info", "transfer_contract", "A", "personal", "birth_day"]} label="Ngày sinh">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput
                type="select"
                name={["change_info", "transfer_contract", "A", "personal", "doc_type"]}
                label="Loại giấy tờ pháp lý"
                options={[
                  { name: "CMND", value: "CMND" },
                  { name: "CCCD", value: "CCCD" },
                  { name: "Hộ chiếu", value: "Hộ chiếu" },
                ]}
              />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info", "transfer_contract", "A", "personal", "doc_code"]} label="Số giấy tờ pháp lý">
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info", "transfer_contract", "A", "personal", "doc_time_provide"]} label="Ngày cấp">
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["change_info", "transfer_contract", "A", "personal", "doc_place_provide"]} label="Nơi cấp">
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item
                name={["change_info", "transfer_contract", "A", "personal", "contact_address"]}
                label="Địa chỉ liên lạc"
              >
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
            <Form.Item
              name={["change_info", "transfer_contract", "A", "organization", "company_name"]}
              label="Tên doanh nghiệp"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={["change_info", "transfer_contract", "A", "organization", "mst"]} label="Mã số doanh nghiệp">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Địa chỉ trụ sở chính">
              <Form.Item
                name={["change_info", "transfer_contract", "A", "organization", "company_address", "street"]}
                label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
              >
                <Input />
              </Form.Item>
              <Form.Item name={["change_info", "transfer_contract", "A", "organization", "town"]} label="Xã/Phường/Thị trấn">
                <Input />
              </Form.Item>
              <Form.Item
                name={["change_info", "transfer_contract", "A", "organization", "district"]}
                label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
              >
                <Input />
              </Form.Item>
              <Form.Item name={["change_info", "transfer_contract", "A", "organization", "city"]} label="Tỉnh/Thành phố">
                <Input />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name={["change_info", "transfer_contract", "A", "organization", "legal_representative"]}
              label="Người đại diện theo pháp luật của công ty"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name={["change_info", "transfer_contract", "A", "organization", "legal_title"]} label="Chức danh">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name={["change_info", "transfer_contract", "A", "organization", "capital_contribution", "current_value"]}
              label="Bên A hiện đang sở hữu phần vốn góp là (Field điền số vốn)"
            >
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={24}>
            <CCInput
              type="select"
              name={["change_info", "transfer_contract", "A", "organization", "capital_contribution", "type"]}
              onChange={(e) => setType(e)}
              options={[
                { name: "Chuyển nhượng toàn bộ phần vốn góp", value: "Chuyển nhượng toàn bộ phần vốn góp" },
                { name: "Chuyển nhượng một phần vốn góp", value: "Chuyển nhượng một phần vốn góp" },
              ]}
            />
          </Col>
          {type === "Chuyển nhượng một phần vốn góp" ? (
            <>
              <Col span={24}>
                <Form.Item
                  name={["change_info", "transfer_contract", "A", "organization", "capital_contribution", "will"]}
                  label="Phần vốn góp bên A muốn chuyển nhượng (field điền số vốn)"
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={["change_info", "transfer_contract", "A", "organization", "capital_contribution", "transfer_price"]}
                  label="Giá chuyển nhượng"
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={["change_info", "transfer_contract", "A", "organization", "capital_contribution", "time_end"]}
                  label="Thời điểm hoàn thành việc chuyển nhượng (Chọn Ngày/ tháng/ năm)"
                >
                  <DatePicker />
                </Form.Item>
              </Col>
            </>
          ) : (
            ""
          )}
          {/** Display when selected === 2 */}
        </Row>
      );
    }
    return xhtml;
  };

  return (
    <Form.Item
      label="Hợp đồng chuyển nhượng phần góp vốn"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Form.Item label="Tên doanh nghiệp" name={["change_info", "transfer_capital_contribution", "company_name"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "transfer_capital_contribution", "mst"]}>
        <Input />
      </Form.Item>

      <Form.Item label="Bên chuyển nhượng phần góp vốn (bên A)">
        <Form.Item label="Chủ sở hữu" name={["change_info", "transfer_capital_contribution", "A", "owner"]}>
          <Select onChange={(e) => setSohuu(e)}>
            <Select.Option value="personal">Trường hợp chủ sở hữu là cá nhân</Select.Option>
            <Select.Option value="organization">Trường hợp chủ sở hữu là tổ chức</Select.Option>
          </Select>
        </Form.Item>
        {renderFormFieldByValue(sohuu)}
      </Form.Item>


      <Form.Item label="Bên nhận chuyển nhượng phần vốn góp (Bên B)">
        <Form.Item label="Chủ sở hữu" name={["change_info", "transfer_capital_contribution", "owner"]}>
          <Select onChange={(e) => setSohuu(e)}>
            <Select.Option value="personal">Trường hợp chủ sở hữu là cá nhân</Select.Option>
            <Select.Option value="organization">Trường hợp chủ sở hữu là tổ chức</Select.Option>
          </Select>
        </Form.Item>
        {renderFormFieldByValue(sohuu)}
      </Form.Item>
    </Form.Item>
  );
});

export default HopDongChuyenNhuong;
