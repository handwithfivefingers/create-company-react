import { Col, Form, Row } from "antd";
import clsx from "clsx";
import React, { forwardRef, useEffect } from "react";
import CCInput from "src/components/CCInput";
import styles from "../DaiDienPhapLuat/styles.module.scss";
const BASE_FORM = ["change_info", "up_authorized_capital"];
const TangVonDieuLe = forwardRef((props, ref) => {
  useEffect(() => {
    if (ref) {
      ref.current.setFieldsValue({
        change_info: {
          up_authorized_capital: {
            type: "Tăng vốn góp",
          },
        },
      });
    }
  }, [ref]);

  return (
    <Form.Item
      label={<h4>Đăng ký thay đổi vốn điều lệ</h4>}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <Row gutter={[16, 0]}>
        {/* <Col span={24}>
         <CCInput label="Tên doanh nghiệp" name={[...BASE_FORM, "company_name"]} />
        </Col>
        <Col span={24}>
          <CCInput label="Mã số doanh nghiệp/ mã số thuế" name={[...BASE_FORM, "mst"]} />
        </Col> */}
        <Col span={12}>
          <CCInput label="Vốn điều lệ đã đăng ký (bằng số)" name={[...BASE_FORM, "base_val", "num"]} />
        </Col>
        <Col span={12}>
          <CCInput label="Vốn điều lệ đã đăng ký (bằng chữ)" name={[...BASE_FORM, "base_val", "char"]} />
        </Col>
        <Col span={12}>
          <CCInput label="Vốn điều lệ sau khi tăng (bằng số)" name={[...BASE_FORM, "new_base_val", "num"]} />
        </Col>
        <Col span={12}>
          <CCInput label="Vốn điều lệ sau khi tăng (bằng chữ)" name={[...BASE_FORM, "new_base_val", "char"]} />
        </Col>
        <Col span={24}>
          <CCInput label="Hình thức tăng vốn" name={[...BASE_FORM, "type"]} />
        </Col>
      </Row>
    </Form.Item>
  );
});

export default TangVonDieuLe;
