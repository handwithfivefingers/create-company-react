import { Col, Form, Row, Select } from "antd";
import clsx from "clsx";
import React, { forwardRef, useEffect, useState } from "react";
import ChuTichHoiDongThanhVien from "./ChuTichHoiDongThanhVien";
import styles from "./CreateCompany.module.scss";
import DiaChiTruSoChinh from "./DiaChiTruSoChinh";
import GiaTriGopVon from "./GiaTriGopVon";
import NgangNgheDangKi from "./NgangNgheDangKi";
import NguoiDaiDienPhapLuat from "./NguoiDaiDienPhapLuat";
import TenCongTy from "./TenCongTy";
import ThanhVienGopVon from "./ThanhVienGopVon";

const BASE_FORM = ["create_company", "approve"];

const CreateCompany = forwardRef((props, formRef) => {
  const [current, setCurrent] = useState(1);

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

  // const handleGetDataFormLocal = (data) => {
  //   let {
  //     base_val,
  //     company_main_career,
  //     company_opt,
  //     company_value,
  //     company_core,
  //     origin_person,
  //     per_main,
  //     present_person,
  //   } = data;
  //   if (origin_person.doc_type === 4) {
  //     setFormData({ ...formData, present_person: 2 });
  //   } else {
  //     setFormData({ ...formData, present_person: 1 });
  //   }
  //   formRef.current.setFieldsValue({
  //     base_val,
  //     company_main_career,
  //     company_opt,
  //     company_value,
  //     company_core,
  //     origin_person: {
  //       ...origin_person,
  //       birth_day: moment(origin_person?.birth_day),
  //       doc_time_provide: moment(origin_person?.doc_time_provide),
  //       // doc_type: origin_person?.doc_type == 4 ? 1 : origin_person?.doc_type, // error here
  //       // doc_code: origin_person?.doc_type == 4 ? "" : origin_person?.doc_code,
  //     },
  //     per_main: {
  //       ...per_main,
  //       birth_day: moment(per_main?.birth_day),
  //     },
  //     present_person,
  //   });
  // };

  // const getCompanyByName = (val) => {
  //   if (val.length > 0) {
  //     axios
  //       .post(`/api/hello`, { params: val })
  //       .then((res) => {
  //         // console.log(res);
  //         setCompanyData(res.data.data);
  //       })
  //       .catch((err) => console.log(err))
  //       .finally(() => {});
  //   } else {
  //     setCompanyData([]);
  //   }
  // };

  const handleFieldsChange = (field, fields) => {
    let val = formRef.current.getFieldsValue();
    window.localStorage.setItem("formData", JSON.stringify(val));
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
      <Form
        layout="vertical"
        ref={formRef}
        onFieldsChange={handleFieldsChange}
        autoComplete="off"
        initialValues={{
          create_company: {
            approve: {
              origin_person: {
                national: "Việt Nam",
              },
            },
          },
        }}
      >
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
        <GiaTriGopVon BASE_FORM={BASE_FORM} current={current} ref={formRef} /> {/** 1 */}
        <ThanhVienGopVon BASE_FORM={BASE_FORM} current={current} ref={formRef} /> {/** 2 */}
        <NguoiDaiDienPhapLuat BASE_FORM={BASE_FORM} current={current} ref={formRef} /> {/** 3 */}
        <ChuTichHoiDongThanhVien BASE_FORM={BASE_FORM} current={current} ref={formRef} /> {/** 4 */}
        <TenCongTy BASE_FORM={BASE_FORM} current={current} ref={formRef} /> {/** 5 */}
        <DiaChiTruSoChinh BASE_FORM={BASE_FORM} current={current} ref={formRef} /> {/** 6 */}
        <NgangNgheDangKi BASE_FORM={BASE_FORM} current={current} ref={formRef} /> {/** 7 */}
      </Form>
    </>
  );
});

export default CreateCompany;
