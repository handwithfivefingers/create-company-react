import { CaretRightOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Collapse, DatePicker, Form, Input, Row, Select, Space } from "antd";
import clsx from "clsx";
import { debounce } from "lodash";
import moment from "moment";
import React, { forwardRef, useEffect, useState } from "react";
import axios from "src/config/axios";
import { FormFieldText } from "src/contants/Common";
import { FORM_SELECT } from "src/contants/FormConstant";
import { number_format } from "src/helper/Common";
import HomepageService from "src/service/GlobalService";
import CCInput from "../../CCInput";
import styles from "./CreateCompany.module.scss";

const popData = {
  content: (
    <ul style={{ maxWidth: 600, listStyle: "none" }}>
      <li>1.Tên riêng trùng với tên riêng của doanh nghiệp đã đăng ký.</li>
      <li>
        2. Tên riêng chỉ khác với tên riêng của doanh nghiệp cùng loại đã đăng ký:
        <ol style={{ listStyle: "none", padding: "0 20px" }}>
          <li>
            a. Bởi một số tự nhiên, một số thứ tự hoặc một chữ cái trong bảng chữ cái tiếng Việt, chữ F, J, Z, W được
            viết liền hoặc cách ngay sau tên riêng của doanh nghiệp đó;
          </li>
          <li>b. Bởi một ký hiệu “&” hoặc “và”, “.”, “,”, “+”, “-”, “_”;</li>
          <li>
            c. Bởi từ “tân” ngay trước hoặc từ “mới” được viết liền hoặc cách ngay sau hoặc trước tên riêng của doanh
            nghiệp đã đăng ký;
          </li>
          <li>d. Bởi một cụm từ “miền Bắc”, “miền Nam”, “miền Trung”, “miền Tây”, “miền Đông”;</li>
        </ol>
      </li>
      <li>
        3. Sử dụng tên cơ quan nhà nước, đơn vị lực lượng vũ trang nhân dân, tên của tổ chức chính trị, tổ chức chính
        trị - xã hội, tổ chức chính trị xã hội - nghề nghiệp, tổ chức xã hội, tổ chức xã hội - nghề nghiệp để làm toàn
        bộ hoặc một phần tên riêng của doanh nghiệp, trừ trường hợp có sự chấp thuận của cơ quan, đơn vị hoặc tổ chức
        đó.
      </li>
      <li>
        4. Sử dụng từ ngữ, ký hiệu vi phạm truyền thống lịch sử, văn hóa, đạo đức và thuần phong mỹ tục của dân tộc.
      </li>
    </ul>
  ),
  title: "Quy tắc đặt tên công ty",
};

const CreateCompany = forwardRef((props, formRef) => {
  const [careerData, setCareerData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [current, setCurrent] = useState(1);

  const [formData, setFormData] = useState({});

  const [companyData, setCompanyData] = useState([]);

  useEffect(() => {
    onFetchCareer();
  }, []);

  useEffect(() => {
    setCurrent(props.step);
  }, [props.step]);

  // useEffect(() => {
  //   formRef.current.setFieldsValue({
  //     origin_person: {
  //       doc_type: null,
  //     },
  //   });
  // }, [formData.present_person]);

  // useEffect(() => {
  //   if (formRef.current) {
  //     let formData = window.localStorage.getItem("formData");
  //     if (formData) {
  //       handleGetDataFormLocal(JSON.parse(formData));
  //     }
  //   }
  // }, [formRef]);

  const onFetchCareer = () => {
    HomepageService.fetchCareer()
      .then((res) => {
        setCareerData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  const handleGetDataFormLocal = (data) => {
    let {
      base_val,
      company_main_career,
      company_opt,
      company_value,
      company_core,
      origin_person,
      per_main,
      present_person,
    } = data;
    if (origin_person.doc_type === 4) {
      setFormData({ ...formData, present_person: 2 });
    } else {
      setFormData({ ...formData, present_person: 1 });
    }
    formRef.current.setFieldsValue({
      base_val,
      company_main_career,
      company_opt,
      company_value,
      company_core,
      origin_person: {
        ...origin_person,
        birth_day: moment(origin_person?.birth_day),
        doc_time_provide: moment(origin_person?.doc_time_provide),
        // doc_type: origin_person?.doc_type == 4 ? 1 : origin_person?.doc_type, // error here
        // doc_code: origin_person?.doc_type == 4 ? "" : origin_person?.doc_code,
      },
      per_main: {
        ...per_main,
        birth_day: moment(per_main?.birth_day),
      },
      present_person,
    });
  };

  // const onFinish = (val) => {
  //   let {
  //     base_val,
  //     company_main_career,
  //     company_opt,
  //     company_value,
  //     legal_respon,
  //     company_core,
  //     origin_person,
  //     per_main,
  //     present_person,
  //   } = val;
  //   let params = {
  //     base_val,
  //     company_main_career,
  //     company_opt,
  //     company_value,
  //     legal_respon,
  //     company_core,
  //     origin_person,
  //     per_main,
  //     present_person,
  //     productId: props?.[0]?._id,
  //   };
  //   if (props?.onFinishScreen) {
  //     props.onFinishScreen(params);
  //   }
  //   // axios
  //   //   .post("/api/register-company", params)
  //   //   .then((res) => {
  //   //     // if (res.data.status === 201) {
  //   //     //   // handle request payment
  //   //     //   let paymentParams = {
  //   //     //     amount: 999999,
  //   //     //     orderDescription: 'Test payment by submit form'
  //   //     //   }
  //   //     //   handlePayment(paymentParams)
  //   //     // }
  //   //     // console.log(res);
  //   //     message.success("Đăng kí thành lập công ty thành công");
  //   //   })
  //   //   .catch((err) => console.log("err", err))
  //   //   .finally();
  // };

  // const handlePayment = (params) => {
  //   axios
  //     .post(`/api/payment`, params)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         return (window.location.href = res.data.url);
  //       }
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // };

  const handleAddmoreField = (lth, add) => {
    // lth : length
    // add : func
    if (lth >= 1) {
      add();
    } else {
      const { create_company } = formRef.current.getFieldsValue();
      let { origin_person } = create_company;
      let {
        name,
        gender,
        birth_day,
        per_type,
        reg_address,
        current_address,
        doc_type,
        doc_code,
        doc_time_provide,
        doc_place_provide,
      } = origin_person;
      let data = {
        name,
        gender,
        birth_day,
        per_type,
        reg_address,
        current_address,
        doc_type: doc_type == 4 ? 1 : doc_type,
        doc_code: doc_type == 4 ? "" : doc_code,
        doc_time_provide,
        doc_place_provide,
      };
      add(data);
    }
  };

  const getCompanyByName = (val) => {
    if (val.length > 0) {
      axios
        .post(`/api/hello`, { params: val })
        .then((res) => {
          // console.log(res);
          setCompanyData(res.data.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {});
    } else {
      setCompanyData([]);
    }
  };

  const handleFieldsChange = (field, fields) => {
    let val = formRef.current.getFieldsValue();
    window.localStorage.setItem("formData", JSON.stringify(val));
  };

  const handleChange = (value, opt) => {
    // let val = formRef.current.getFieldsValue();
    formRef.current.setFieldsValue({
      create_company: {
        company_opt_career: opt,
      },
    });
  };

  const dropdownRender = () => {
    return (
      <Select>
        {props.data?.map((item) => {
          return (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
    );
  };

  return (
    <>
      <Form layout="vertical" ref={formRef} onFieldsChange={handleFieldsChange}>
        <Row
          className={clsx([
            styles.hide,
            {
              [styles.visible]: current === 0,
            },
          ])}
        >
          <Col span={24}>
            <Form.Item name={["selectProduct"]} required label="Chọn loại hình doanh nghiệp">
              {dropdownRender()}
            </Form.Item>
          </Col>
        </Row>

        <Row
          gutter={[16, 12]}
          className={clsx([
            styles.hide,
            {
              [styles.visible]: current === 1,
            },
          ])}
        >
          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              type="number"
              name={["create_company", "base_val", "num"]}
              label={FormFieldText["base_val"]["num"]}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              style={{ width: "100%" }}
              onChange={(e) => formRef?.current.setFieldsValue({ company_value: e })}
            />
          </Col>

          <Col lg={12} md={12} sm={24} xs={24}>
            <CCInput
              type="text"
              name={["create_company", "base_val", "char"]}
              label={FormFieldText["base_val"]["char"]}
              onChange={(e) => {
                let pattern = /[1-9]/g;
                if (e.target.value.match(pattern)) {
                  formRef.current.setFields([
                    {
                      name: ["create_company", "base_val", "char"],
                      errors: ["Vui lòng không nhập kí tự khác ngoài chữ"],
                    },
                  ]);
                } else {
                  formRef.current.setFields([
                    {
                      name: ["create_company", "base_val", "char"],
                      errors: [],
                    },
                  ]);
                }
              }}
            />
          </Col>
        </Row>

        <Form.Item
          label={<h3>Thành viên góp vốn</h3>}
          className={clsx([
            styles.hide,
            {
              [styles.visible]: current === 2,
            },
          ])}
        >
          <Row gutter={[16, 12]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <CCInput
                type="text"
                name={["create_company", "origin_person", "name"]}
                label={FormFieldText["origin_person"]}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {/* <Form.Item label="Người đại diện" name="present_person">
                <Select onSelect={(e) => setFormData({ ...formData, present_person: e })}>
                  <Select.Option
                    value={1}
                    // file: 1-A, 2 ,3
                  >
                    Người đại diện là cá nhân
                  </Select.Option>
                  <Select.Option
                    value={2}
                    // file: 1-B, 2 , 3
                  >
                 
                    Người đại diện là tổ chức
                  </Select.Option>
                </Select>
              </Form.Item> */}
              <CCInput
                type="select"
                label="Người đại diện"
                name={["create_company", "present_person"]}
                onSelect={(e) => setFormData({ ...formData, present_person: e })}
                options={[
                  { value: 1, name: "Người đại diện là cá nhân" },
                  { value: 2, name: "Người đại diện là tổ chức" },
                ]}
              />
            </Col>
            {formData?.present_person == 1 ? (
              <>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <CCInput
                    type="select"
                    name={["create_company", "origin_person", "gender"]}
                    label="Giới tính"
                    options={[
                      { value: "Nữ", name: "Nữ" },
                      { value: "Nam", name: "Nam" },
                    ]}
                  />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <CCInput type="date" name={["create_company", "origin_person", "birth_day"]} label="Ngày sinh" />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <Form.Item name={["create_company", "origin_person", "per_type"]} label="Dân tộc">
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <Form.Item
                    name={["create_company", "origin_person", "reg_address"]}
                    label="Nơi đăng kí hộ khẩu thường trú"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <CCInput
                    type="text"
                    name={["create_company", "origin_person", "current_address"]}
                    label="Chỗ ở hiện tại"
                  />
                </Col>
              </>
            ) : (
              ""
            )}
          </Row>

          <Form.Item label={<h3>Giấy tờ pháp lý</h3>}>
            <Row gutter={[16, 12]}>
              <Col lg={12} md={12} sm={24} xs={24}>
                {/* <Form.Item name={["create_company", "origin_person", "doc_type"]} label="Loại giấy tờ">
                  <Select>
                    {formData?.present_person === 1
                      ? FORM_SELECT.map((item) => {
                          if (item.value !== 4) {
                            return (
                              <Select.Option key={item.name} value={item.name}>
                                {item.name}
                              </Select.Option>
                            );
                          }
                        })
                      : FORM_SELECT.map((item) => {
                          if (item.value === 4) {
                            return (
                              <Select.Option key={item.name} value={item.name}>
                                {item.name}
                              </Select.Option>
                            );
                          }
                        })}
                  </Select>
                </Form.Item> */}
                <CCInput
                  type="select"
                  name={["create_company", "origin_person", "doc_type"]}
                  label="Loại giấy tờ"
                  options={
                    formData?.present_person === 1
                      ? FORM_SELECT.filter((item) => item.value !== "Mã doanh nghiệp")
                      : FORM_SELECT.filter((item) => item.value === "Mã doanh nghiệp")
                  }
                />
              </Col>
              <Col lg={12} md={12} sm={24} xs={24}>
                {formData?.present_person === 1 ? (
                  <CCInput
                    type="text"
                    label={"Số CMND/ CCCD/ Hộ chiếu"}
                    name={["create_company", "origin_person", "doc_code"]}
                  />
                ) : (
                  <CCInput
                    type="text"
                    label={"Mã doanh nghiệp"}
                    name={["create_company", "origin_person", "doc_code"]}
                  />
                )}
              </Col>

              <Col lg={12} md={12} sm={24} xs={24}>
                <CCInput type="date" name={["create_company", "origin_person", "doc_time_provide"]} label="Ngày cấp" />
              </Col>

              <Col lg={12} md={12} sm={24} xs={24}>
                <CCInput type="text" name={["create_company", "origin_person", "doc_place_provide"]} label="Nơi cấp" />
              </Col>
            </Row>
          </Form.Item>

          <CCInput
            type="number"
            formatter={(val) => `${number_format(val)}`}
            style={{ width: "100%" }}
            name={["create_company", "company_value"]}
            label="Giá trị góp vốn"
          />
        </Form.Item>

        <Form.Item
          label={<h2>Người đại diện pháp luật </h2>}
          className={clsx([
            styles.hide,
            {
              [styles.visible]: current === 3,
            },
          ])}
        >
          <Row gutter={[16, 12]}>
            <Form.List name={["create_company", "legal_respon"]}>
              {(fields, { add, remove }) => (
                <>
                  {fields?.map((field, i) => (
                    <>
                      <Col lg={8} md={12} sm={24} xs={24} key={[field, i]}>
                        <Form.Item {...field} name={[field.name, "name"]} label="Họ và tên">
                          <Input />
                        </Form.Item>
                        {/* <Form.Item {...field} name={[field.name, "title"]} label="Chức danh">
                          <Select>
                            <Select.Option value={1}>Chủ tịch công ty</Select.Option>

                            <Select.Option value={2}>Giám đốc</Select.Option>

                            <Select.Option value={3}>Tổng giám đốc</Select.Option>
                          </Select>
                        </Form.Item> */}
                        <CCInput
                          type="select"
                          {...field}
                          name={[field.name, "title"]}
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
                        {/* <Form.Item {...field} name={[field.name, "gender"]} label="Giới tính">
                          <Select>
                            <Select.Option value={0}>Nữ</Select.Option>
                            <Select.Option value={1}>Nam</Select.Option>
                          </Select>
                        </Form.Item> */}
                        <CCInput
                          type="select"
                          {...field}
                          name={[field.name, "gender"]}
                          label="Giới tính"
                          options={[
                            {
                              value: "Nữ",
                              name: "Nữ",
                            },
                            {
                              value: "Nam",
                              name: "Nam",
                            },
                          ]}
                        />

                        <Form.Item {...field} name={[field.name, "birth_day"]} label="Ngày sinh">
                          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
                        </Form.Item>
                        <Form.Item {...field} name={[field.name, "per_type"]} label="Dân tộc">
                          <Input />
                        </Form.Item>
                        <Form.Item {...field} name={[field.name, "national"]} label="Quốc tịch">
                          <Input />
                        </Form.Item>
                        <Form.Item {...field} name={[field.name, "reg_address"]} label="Nơi đăng kí hộ khẩu thường trú">
                          <Input />
                        </Form.Item>

                        <Form.Item {...field} name={[field.name, "current_address"]} label="Nơi ở hiện tại">
                          <Input />
                        </Form.Item>

                        <Form.Item label={<h2>Loại giấy tờ pháp lý </h2>}>
                          <Row gutter={[16, 12]}>
                            <Col lg={24} md={24} sm={24} xs={24}>
                              <CCInput
                                type="select"
                                name={[field.name, "doc_type"]}
                                label="Loại giấy tờ"
                                options={FORM_SELECT.filter((item) => item.value !== "Mã doanh nghiệp")}
                              />
                            </Col>
                            <Col lg={24} md={24} sm={24} xs={24}>
                              <Form.Item name={[field.name, "doc_code"]} label="Số CMND/ CCCD/ Hộ chiếu">
                                <Input />
                              </Form.Item>
                            </Col>

                            <Col lg={24} md={24} sm={24} xs={24}>
                              <Form.Item name={[field.name, "doc_time_provide"]} label="Ngày cấp">
                                <DatePicker style={{ width: "100%" }} />
                              </Form.Item>
                            </Col>

                            <Col lg={24} md={24} sm={24} xs={24}>
                              <Form.Item name={[field.name, "doc_place_provide"]} label="Nơi cấp">
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Form.Item>

                        <Space style={{ display: "flex", justifyContent: "center" }}>
                          <MinusCircleOutlined onClick={() => remove(field.name)} />
                        </Space>
                      </Col>
                    </>
                  ))}

                  {fields.length >= 3 ? (
                    ""
                  ) : (
                    <Form.Item label=" ">
                      <Button
                        type="dashed"
                        onClick={() => handleAddmoreField(fields?.length, add)}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm người đại diện pháp luật
                      </Button>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>
          </Row>
        </Form.Item>

        <Form.Item
          label={<h2>Chủ tịch công ty/chủ tịch Hội đồng thành viên</h2>}
          className={clsx([
            styles.hide,
            {
              [styles.visible]: current === 4,
            },
          ])}
        >
          <Row gutter={[16, 12]}>
            <Col span={24}>
              <Button
                onClick={() => {
                  let { origin_person } = formRef.current.getFieldsValue();
                  formRef.current.setFieldsValue({
                    per_main: {
                      ...origin_person,
                      // birth_day: moment(origin_person?.birth_day).format("YYYY-MM-DD"),
                    },
                  });
                }}
              >
                Auto Fill
              </Button>
              <Button
                onClick={() => {
                  formRef.current.setFieldsValue({
                    per_main: [],
                  });
                }}
              >
                Clear
              </Button>
            </Col>
            <Col span={24}>
              <Form.Item name={["create_company", "per_main", "name"]} label="Họ và tên">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              {/* <Form.Item name={["create_company", "per_main", "gender"]} label="Giới tính">
                <Select>
                  <Select.Option value={0}>Nữ</Select.Option>
                  <Select.Option value={1}>Nam</Select.Option>
                </Select>
              </Form.Item> */}
              <CCInput
                type="select"
                name={["create_company", "per_main", "gender"]}
                label="Giới tính"
                options={[
                  {
                    value: "Nữ",
                    name: "Nữ",
                  },
                  {
                    value: "Nam",
                    name: "Nam",
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["create_company", "per_main", "birth_day"]} label="Ngày sinh">
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["create_company", "per_main", "per_type"]} label="Dân tộc">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["create_company", "per_main", "reg_address"]} label="Nơi đăng kí hộ khẩu thường trú">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["create_company", "per_main", "current_address"]} label="Chỗ ở hiện tại">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          label={<h2>Tên công ty </h2>}
          className={clsx([
            styles.hide,
            {
              [styles.visible]: current === 5,
            },
          ])}
        >
          <Row gutter={[16, 12]}>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Collapse
                bordered={false}
                defaultActiveKey={[]}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
                ghost
              >
                <Collapse.Panel header={popData.title} key="1" className="site-collapse-custom-panel">
                  <p style={{ fontSize: "12px" }}>{popData.content}</p>
                </Collapse.Panel>
              </Collapse>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24}>
              <Form.Item name={["create_company", "company_core", "name"]} label="Tên công ty bằng Tiếng Việt">
                <Input onChange={debounce((e) => getCompanyByName(e.target.value), 700)} />
              </Form.Item>
              <div style={{ padding: "0 0 10px 0" }}>
                {companyData && companyData?.length > 0 && (
                  <Card title="Công ty đã đăng kí">
                    {companyData?.map((item) => {
                      return <Alert key={item.Title} message={item.Title} type="error" />;
                    })}
                  </Card>
                )}
              </div>
              <Form.Item
                name={["create_company", "company_core", "name_en"]}
                label="Tên công ty bằng Tiếng Anh (nếu có)"
              >
                <Input />
              </Form.Item>
              <Form.Item name={["create_company", "company_core", "name_vn"]} label="Tên công ty viết tắt (nếu có)">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          label={<h2>Địa chỉ đặt trụ sở</h2>}
          className={clsx([
            styles.hide,
            {
              [styles.visible]: current === 6,
            },
          ])}
        >
          <Form.Item name={["create_company", "company_core", "address"]} label="Địa chỉ trụ sở chính">
            <Input />
          </Form.Item>
          <Form.Item name={["create_company", "company_core", "address_opt_1"]} label="Địa chỉ chi nhánh (nếu có)">
            <Input />
          </Form.Item>
          <Form.Item
            name={["create_company", "company_core", "address_opt_2"]}
            label="Địa chỉ văn phòng đại diện (nếu có)"
          >
            <Input />
          </Form.Item>
        </Form.Item>

        <Form.Item
          label={<h2>Ngành nghề đăng kí</h2>}
          className={clsx([
            styles.hide,
            {
              [styles.visible]: current === 7,
            },
          ])}
        >
          <Form.Item label="Ngành nghề chính">
            <Row gutter={[16, 12]}>
              <Col span={24}>
                <Form.Item name={["create_company", "company_main_career"]} placeholder="Gõ tên ngành hoặc mã ngành">
                  <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    onClear={() => {
                      formRef.current.setFieldsValue({ career_id: "" });
                      onFetchCareer();
                    }}
                  >
                    {careerData.map((item) => (
                      <Select.Option key={item._id} value={item._id}>
                        {item.code}-{item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Row gutter={[16, 12]}>
            <Col span={24}>
              <Form.Item name={["create_company", "company_opt_career"]} label="Tên ngành">
                <Select
                  showSearch
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  onChange={handleChange}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.join("").toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {careerData.map((item) => (
                    <Select.Option key={item._id} value={item._id} code={item.code} name={item.name}>
                      {item.code}-{item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
});

export default CreateCompany;
