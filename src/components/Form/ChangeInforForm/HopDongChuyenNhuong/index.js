import React, { forwardRef, useState } from "react";
import { Form, Input, Select, Card, Row, Col, DatePicker, InputNumber, Space, Button } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
import CCInput from "src/components/CCInput";
const BASE_FORM = ["change_info", "transfer_contract"];
const HopDongChuyenNhuong = forwardRef((props, ref) => {
  const [sohuuA, setSohuuA] = useState();
  const [sohuuB, setSohuuB] = useState();
  const [type, setType] = useState("");

  // const renderFormFieldByValue = (condition) => {
  //   let xhtml = null;
  //   if (condition === "personal") {
  //     xhtml = // chủ sở hữu là cá nhân
  //       (
  //         <Row>
  //           <Col lg={12} md={12} sm={24} xs={24}>
  //             <Form.Item name={["change_info", "transfer_contract", "A", "personal", "name"]} label="Họ và tên">
  //               <Select>
  //                 <Select.Option value={0}>Nữ</Select.Option>
  //                 <Select.Option value={1}>Nam</Select.Option>
  //               </Select>
  //             </Form.Item>
  //           </Col>
  //           <Col lg={12} md={12} sm={24} xs={24}>
  //             <Form.Item name={["change_info", "transfer_contract", "A", "personal", "birth_day"]} label="Ngày sinh">
  //               <DatePicker style={{ width: "100%" }} />
  //             </Form.Item>
  //           </Col>

  //           <Col lg={12} md={12} sm={24} xs={24}>
  //             <CCInput
  //               type="select"
  //               name={["change_info", "transfer_contract", "A", "personal", "doc_type"]}
  //               label="Loại giấy tờ pháp lý"
  //               options={[
  //                 { name: "CMND", value: "CMND" },
  //                 { name: "CCCD", value: "CCCD" },
  //                 { name: "Hộ chiếu", value: "Hộ chiếu" },
  //               ]}
  //             />
  //           </Col>

  //           <Col lg={12} md={12} sm={24} xs={24}>
  //             <Form.Item
  //               name={["change_info", "transfer_contract", "A", "personal", "doc_code"]}
  //               label="Số giấy tờ pháp lý"
  //             >
  //               <Input />
  //             </Form.Item>
  //           </Col>

  //           <Col lg={12} md={12} sm={24} xs={24}>
  //             <Form.Item
  //               name={["change_info", "transfer_contract", "A", "personal", "doc_time_provide"]}
  //               label="Ngày cấp"
  //             >
  //               <Input />
  //             </Form.Item>
  //           </Col>

  //           <Col lg={12} md={12} sm={24} xs={24}>
  //             <Form.Item
  //               name={["change_info", "transfer_contract", "A", "personal", "doc_place_provide"]}
  //               label="Nơi cấp"
  //             >
  //               <Input />
  //             </Form.Item>
  //           </Col>

  //           <Col lg={12} md={12} sm={24} xs={24}>
  //             <Form.Item
  //               name={["change_info", "transfer_contract", "A", "personal", "contact_address"]}
  //               label="Địa chỉ liên lạc"
  //             >
  //               <Input />
  //             </Form.Item>
  //           </Col>
  //         </Row>
  //       );
  //   } else {
  //     // Chủ sở hữu là tổ chức
  //     xhtml = (
  //       <Row>
  //         <Col lg={12} md={12} sm={24} xs={24}>
  //           <Form.Item
  //             name={["change_info", "transfer_contract", "A", "organization", "company_name"]}
  //             label="Tên doanh nghiệp"
  //           >
  //             <Input />
  //           </Form.Item>
  //         </Col>
  //         <Col lg={12} md={12} sm={24} xs={24}>
  //           <Form.Item
  //             name={["change_info", "transfer_contract", "A", "organization", "mst"]}
  //             label="Mã số doanh nghiệp"
  //           >
  //             <Input />
  //           </Form.Item>
  //         </Col>
  //         <Col span={24}>
  //           <Form.Item label="Địa chỉ trụ sở chính">
  //             <Form.Item
  //               name={["change_info", "transfer_contract", "A", "organization", "company_address", "street"]}
  //               label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
  //             >
  //               <Input />
  //             </Form.Item>
  //             <Form.Item
  //               name={["change_info", "transfer_contract", "A", "organization", "town"]}
  //               label="Xã/Phường/Thị trấn"
  //             >
  //               <Input />
  //             </Form.Item>
  //             <Form.Item
  //               name={["change_info", "transfer_contract", "A", "organization", "district"]}
  //               label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
  //             >
  //               <Input />
  //             </Form.Item>
  //             <Form.Item
  //               name={["change_info", "transfer_contract", "A", "organization", "city"]}
  //               label="Tỉnh/Thành phố"
  //             >
  //               <Input />
  //             </Form.Item>
  //           </Form.Item>
  //         </Col>

  //         <Col span={24}>
  //           <Form.Item
  //             name={["change_info", "transfer_contract", "A", "organization", "legal_representative"]}
  //             label="Người đại diện theo pháp luật của công ty"
  //           >
  //             <Input />
  //           </Form.Item>
  //         </Col>
  //         <Col span={24}>
  //           <Form.Item
  //             name={["change_info", "transfer_contract", "A", "organization", "legal_title"]}
  //             label="Chức danh"
  //           >
  //             <Input />
  //           </Form.Item>
  //         </Col>
  //         <Col span={24}>
  //           <Form.Item
  //             name={["change_info", "transfer_contract", "A", "organization", "capital_contribution", "current_value"]}
  //             label="Bên A hiện đang sở hữu phần vốn góp là (Field điền số vốn)"
  //           >
  //             <InputNumber />
  //           </Form.Item>
  //         </Col>
  //         <Col span={24}>
  //           <CCInput
  //             type="select"
  //             name={["change_info", "transfer_contract", "A", "organization", "capital_contribution", "type"]}
  //             onChange={(e) => setType(e)}
  //             options={[
  //               { name: "Chuyển nhượng toàn bộ phần vốn góp", value: "Chuyển nhượng toàn bộ phần vốn góp" },
  //               { name: "Chuyển nhượng một phần vốn góp", value: "Chuyển nhượng một phần vốn góp" },
  //             ]}
  //           />
  //         </Col>
  //         {type === "Chuyển nhượng một phần vốn góp" ? (
  //           <>
  //             <Col span={24}>
  //               <Form.Item
  //                 name={["change_info", "transfer_contract", "A", "organization", "capital_contribution", "will"]}
  //                 label="Phần vốn góp bên A muốn chuyển nhượng (field điền số vốn)"
  //               >
  //                 <InputNumber />
  //               </Form.Item>
  //             </Col>
  //             <Col span={24}>
  //               <Form.Item
  //                 name={[
  //                   "change_info",
  //                   "transfer_contract",
  //                   "A",
  //                   "organization",
  //                   "capital_contribution",
  //                   "transfer_price",
  //                 ]}
  //                 label="Giá chuyển nhượng"
  //               >
  //                 <InputNumber />
  //               </Form.Item>
  //             </Col>
  //             <Col span={24}>
  //               <Form.Item
  //                 name={["change_info", "transfer_contract", "A", "organization", "capital_contribution", "time_end"]}
  //                 label="Thời điểm hoàn thành việc chuyển nhượng (Chọn Ngày/ tháng/ năm)"
  //               >
  //                 <DatePicker />
  //               </Form.Item>
  //             </Col>
  //           </>
  //         ) : (
  //           ""
  //         )}
  //         {/** Display when selected === 2 */}
  //       </Row>
  //     );
  //   }
  //   return xhtml;
  // };

  const handleFill = () => {
    if (!ref) return;
    let val = ref.current.getFieldsValue();
    let { reg_address, town, district, city } = val.change_info.transfer_contract?.B_side?.personal;
    ref.current.setFieldsValue({
      change_info: {
        transfer_contract: {
          B_side: {
            personal: {
              contact_reg_address: reg_address,
              contact_town: town,
              contact_district: district,
              contact_city: city,
            },
          },
        },
      },
    });
  };

  const renderFormOnwerA = (condition, fieldName) => {
    let xhtml = null;

    if (condition === "personal") {
      // Trường hợp chủ sở hữu là cá nhân
      // Họ và tên:
      // Sinh ngày
      // Loại giấy tờ pháp lý (Dropdown: chứng minh nhân dân/căn cước công dân/hộ chiếu)
      // Số giấy tờ pháp lý:
      // Ngày cấp:
      // Nơi cấp:
      // Địa chỉ liên lạc
      xhtml = (
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "personal", "name"]} label="Họ và tên">
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "personal", "birth_day"]} label="Ngày sinh">
              <DatePicker style={{ width: "100%" }} inputReadOnly />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              type="select"
              name={[...fieldName, "personal", "doc_type"]}
              label="Loại giấy tờ pháp lý"
              options={[
                { name: "CMND", value: "CMND" },
                { name: "CCCD", value: "CCCD" },
                { name: "Hộ chiếu", value: "Hộ chiếu" },
              ]}
            />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "personal", "doc_code"]} label="Số giấy tờ pháp lý" size="small">
              <Input />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "personal", "doc_time_provide"]} label="Ngày cấp">
              <DatePicker style={{ width: "100%" }} inputReadOnly />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "personal", "doc_place_provide"]} label="Nơi cấp">
              <Input />
            </Form.Item>
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "personal", "contact_address"]} label="Địa chỉ liên lạc">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      );
    } else {
      // Chủ sở hữu là tổ chức
      // Trường hợp chủ sở hữu là tổ chức:
      // Tên doanh nghiệp
      // Mã số doanh nghiệp
      // Địa chỉ trụ sở chính
      // Người đại diện theo pháp luật của công ty:
      // Chức danh:
      xhtml = (
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "organization", "company_name"]} label="Tên doanh nghiệp">
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "organization", "mst"]} label="Mã số doanh nghiệp">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Địa chỉ trụ sở chính">
              <Form.Item
                name={[...fieldName, "organization", "company_address", "street"]}
                label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
              >
                <Input />
              </Form.Item>
              <Form.Item name={[...fieldName, "organization", "company_address", "town"]} label="Xã/Phường/Thị trấn">
                <Input />
              </Form.Item>
              <Form.Item
                name={[...fieldName, "organization", "company_address", "district"]}
                label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
              >
                <Input />
              </Form.Item>
              <Form.Item name={[...fieldName, "organization", "company_address", "city"]} label="Tỉnh/Thành phố">
                <Input />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name={[...fieldName, "organization", "legal_representative"]}
              label="Người đại diện theo pháp luật của công ty"
            >
              <Input />
            </Form.Item>
          </Col>
          {/** ???? */}
        </Row>
      );
    }
    return xhtml;
  };

  const renderFormOwnerB = (condition, fieldName) => {
    let xhtml = null;
    if (condition === "personal") {
      // Trường hợp chủ sở hữu là cá nhân
      // Họ và tên:
      // Sinh ngày
      // Loại giấy tờ pháp lý (Dropdown: chứng minh nhân dân/căn cước công dân/hộ chiếu)
      // Số giấy tờ pháp lý:
      // Ngày cấp:
      // Nơi cấp:
      // "Tiêu đề ""Địa chỉ thường trú:""
      // Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn:
      // Xã/Phường/Thị trấn:
      // Quận/Huyện/Thị xã/Thành phố thuộc tỉnh:
      // Tỉnh/Thành phố"
      // "Tiêu đề ""Địa chỉ liên lạc:""
      // Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn:
      // Xã/Phường/Thị trấn:
      // Quận/Huyện/Thị xã/Thành phố thuộc tỉnh:
      // Tỉnh/Thành phố"

      xhtml = // chủ sở hữu là cá nhân
        (
          <Row>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={[...fieldName, "personal", "name"]} label="Họ và tên">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={[...fieldName, "personal", "birth_day"]} label="Ngày sinh">
                <DatePicker style={{ width: "100%" }} inputReadOnly />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput
                type="select"
                name={[...fieldName, "personal", "doc_type"]}
                label="Loại giấy tờ pháp lý"
                options={[
                  { name: "CMND", value: "CMND" },
                  { name: "CCCD", value: "CCCD" },
                  { name: "Hộ chiếu", value: "Hộ chiếu" },
                ]}
              />
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={[...fieldName, "personal", "doc_code"]} label="Số giấy tờ pháp lý" size="small">
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={[...fieldName, "personal", "doc_time_provide"]} label="Ngày cấp">
                <DatePicker style={{ width: "100%" }} inputReadOnly />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={[...fieldName, "personal", "doc_place_provide"]} label="Nơi cấp">
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Địa chỉ thường trú">
                <Form.Item
                  name={[...fieldName, "personal", "reg_address"]}
                  label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
                >
                  <Input />
                </Form.Item>
                <Form.Item name={[...fieldName, "personal", "town"]} label="Xã/Phường/Thị Trấn">
                  <Input />
                </Form.Item>
                <Form.Item name={[...fieldName, "personal", "district"]} label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh">
                  <Input />
                </Form.Item>
                <Form.Item name={[...fieldName, "personal", "city"]} label="Tỉnh/Thành phố">
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item label="Địa chỉ liên lạc">
                <Button onClick={handleFill}>Tự động điền</Button>
                <Form.Item
                  name={[...fieldName, "personal", "contact_reg_address"]}
                  label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
                >
                  <Input />
                </Form.Item>
                <Form.Item name={[...fieldName, "personal", "contact_town"]} label="Xã/Phường/Thị Trấn">
                  <Input />
                </Form.Item>
                <Form.Item
                  name={[...fieldName, "personal", "contact_district"]}
                  label="Quận/Huyện/Thị Xã/Thành phố thuộc tỉnh"
                >
                  <Input />
                </Form.Item>
                <Form.Item name={[...fieldName, "personal", "contact_city"]} label="Tỉnh/Thành phố">
                  <Input />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
        );
    } else {
      // Trường hợp chủ sở hữu là tổ chức:
      // Tên doanh nghiệp
      // Mã số doanh nghiệp
      // "Tiêu đề: Địa chỉ trụ sở chính
      // Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn:
      // Xã/Phường/Thị trấn:
      // Quận/Huyện/Thị xã/Thành phố thuộc tỉnh:
      // Tỉnh/Thành phố"
      // Người đại diện theo pháp luật của công ty:
      // Chức danh:

      // Bên A hiện đang sở hữu phần vốn góp là (Field điền số vốn)
      // Dropdown 2 lựa chọn "Chuyển nhượng toàn bộ phần vốn góp " và "Chuyển nhượng một phần vốn góp"
      // Nếu chọn "Chuyển nhượng 1 phần" thì hiện field này:
      // Phần vốn góp bên A muốn chuyển nhượng (field điền số vốn)
      // Giá chuyển nhượng:
      // Thời điểm hoàn thành việc chuyển nhượng (Chọn Ngày/ tháng/ năm)
      xhtml = (
        <Row>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "organization", "company_name"]} label="Tên doanh nghiệp">
              <Input />
            </Form.Item>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Form.Item name={[...fieldName, "organization", "mst"]} label="Mã số doanh nghiệp">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Địa chỉ trụ sở chính">
              <Form.Item
                name={[...fieldName, "organization", "company_address", "street"]}
                label="Số nhà, ngách, hẻm, ngõ, đường phố/tổ/xóm/ấp/thôn"
              >
                <Input />
              </Form.Item>
              <Form.Item name={[...fieldName, "organization", "company_address", "town"]} label="Xã/Phường/Thị trấn">
                <Input />
              </Form.Item>
              <Form.Item
                name={[...fieldName, "organization", "company_address", "district"]}
                label="Quận/Huyện/Thị xã/Thành phố thuộc tỉnh"
              >
                <Input />
              </Form.Item>
              <Form.Item name={[...fieldName, "organization", "company_address", "city"]} label="Tỉnh/Thành phố">
                <Input />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name={[...fieldName, "organization", "legal_representative"]}
              label="Người đại diện theo pháp luật của công ty"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name={[...fieldName, "organization", "legal_title"]} label="Chức danh">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Bên A hiện đang sở hữu phần vốn góp là">
              <Space align="center">
                <Form.Item name={[...fieldName, "organization", "capital_contribution", "current_value"]}>
                  <InputNumber />
                </Form.Item>
                <CCInput
                  type="select"
                  style={{ width: "100%" }}
                  name={[...fieldName, "organization", "capital_contribution", "type"]}
                  onChange={(e) => setType(e)}
                  options={[
                    { name: "Chuyển nhượng toàn bộ phần vốn góp", value: "Chuyển nhượng toàn bộ phần vốn góp" },
                    { name: "Chuyển nhượng một phần vốn góp", value: "Chuyển nhượng một phần vốn góp" },
                  ]}
                />
              </Space>
            </Form.Item>
          </Col>

          {type === "Chuyển nhượng một phần vốn góp" ? (
            <>
              <Col span={24}>
                <Form.Item
                  name={[...fieldName, "organization", "capital_contribution", "will"]}
                  label="Phần vốn góp bên A muốn chuyển nhượng"
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={[...fieldName, "organization", "capital_contribution", "transfer_price"]}
                  label="Giá chuyển nhượng"
                >
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={[...fieldName, "organization", "capital_contribution", "time_end"]}
                  label="Thời điểm hoàn thành việc chuyển nhượng (Chọn Ngày/ tháng/ năm)"
                >
                  <DatePicker style={{ width: "100%" }} inputReadOnly />
                </Form.Item>
              </Col>
            </>
          ) : (
            ""
          )}
        </Row>
      );
    }
    return xhtml;
  };

  return (
    <Form.Item
      label={<h4>Hợp đồng chuyển nhượng phần góp vốn</h4>}
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

      <Form.Item label="Bên chuyển nhượng phần góp vốn (bên A)">
        <Form.Item label="Chủ sở hữu" name={[...BASE_FORM, "A_side", "owner"]}>
          <Select onChange={(e) => setSohuuA(e)}>
            <Select.Option value="personal">Trường hợp chủ sở hữu là cá nhân</Select.Option>
            <Select.Option value="organization">Trường hợp chủ sở hữu là tổ chức</Select.Option>
          </Select>
        </Form.Item>
        {renderFormOnwerA(sohuuA, [...BASE_FORM, "A_side"])}
      </Form.Item>

      <Form.Item label="Bên nhận chuyển nhượng phần vốn góp (Bên B)">
        <Form.Item label="Chủ sở hữu" name={[...BASE_FORM, "B_side", "owner"]}>
          <Select onChange={(e) => setSohuuB(e)}>
            <Select.Option value="personal">Trường hợp chủ sở hữu là cá nhân</Select.Option>
            <Select.Option value="organization">Trường hợp chủ sở hữu là tổ chức</Select.Option>
          </Select>
        </Form.Item>
        {renderFormOwnerB(sohuuB, [...BASE_FORM, "B_side"])}
      </Form.Item>
    </Form.Item>
  );
});

export default HopDongChuyenNhuong;
