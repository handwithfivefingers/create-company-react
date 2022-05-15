import React, { forwardRef } from "react";

import { Row, Col, Form } from "antd";

import { FormFieldText } from "src/contants/Common";

import CCInput from "src/components/CCInput";

const GiaTriGopVon = forwardRef((props, ref) => {
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
              formRef.current.setFields([
                {
                  name: [...BASE_FORM, "base_val", "char"],
                  errors: ["Vui lòng không nhập kí tự khác ngoài chữ"],
                },
              ]);
            } else {
              formRef.current.setFields([
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
