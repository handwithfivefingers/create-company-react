import { Col, Form, InputNumber, Row } from "antd";
import clsx from "clsx";
import React, { forwardRef } from "react";
import CCInput from "src/components/CCInput";
import { FormFieldText } from "src/contants/Common";
import styles from "./styles.module.scss";


const GiaTriGopVon = forwardRef((props, ref) => {
  const { current, BASE_FORM } = props;
  return (
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
        <Form.Item name={[...BASE_FORM, "base_val", "num"]} label={FormFieldText["base_val"]["num"]}>
          <InputNumber
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            style={{ width: "100%" }}
          /> 
        </Form.Item>
      </Col>

      <Col lg={12} md={12} sm={24} xs={24}>
        <CCInput
          type="text"
          name={[...BASE_FORM, "base_val", "char"]}
          label={FormFieldText["base_val"]["char"]}
          onChange={(e) => {
            let pattern = /[1-9]/g;
            if (e.target.value.match(pattern)) {
              ref.current.setFields([
                {
                  name: [...BASE_FORM, "base_val", "char"],
                  errors: ["Vui lòng không nhập kí tự khác ngoài chữ"],
                },
              ]);
            } else {
              ref.current.setFields([
                {
                  name: [...BASE_FORM, "base_val", "char"],
                  errors: [],
                },
              ]);
            }
          }}
        />
      </Col>
    </Row>
  );
});

export default GiaTriGopVon;
