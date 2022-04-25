import React, { forwardRef } from "react";
import { Form, Input, Select, Card, Row, Col } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
const TangVonDieuLe = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="ĐĂNG KÝ THAY ĐỔI VỐN ĐIỀU LỆ"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
      // name={["up_value"]}
    >
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <Form.Item label="Tên doanh nghiệp" name={["up_value", "company_name"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["up_value", "mst"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vốn điều lệ đã đăng ký (bằng số)" name={["up_value", "base_val", "num"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vốn điều lệ đã đăng ký (bằng chữ)" name={["up_value", "base_val", "char"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vốn điều lệ sau khi tăng (bằng số)" name={["up_value", "new_base_val", "num"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vốn điều lệ sau khi tăng (bằng chữ)" name={["up_value", "new_base_val", "char"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Hình thức tăng vốn" name={["up_value", "type"]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
});

export default TangVonDieuLe;
