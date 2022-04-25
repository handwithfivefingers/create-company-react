import React, { forwardRef } from "react";
import { Form, Input, Select, Card, Row, Col } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
const GiamVonDieuLe = forwardRef((props, ref) => {
  return (
    <Form.Item
      label="ĐĂNG KÝ THAY ĐỔI VỐN ĐIỀU LỆ"
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <Form.Item label="Tên doanh nghiệp" name={["down_value", "company_name"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["down_value", "mst"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vốn điều lệ đã đăng ký (bằng số)" name={["down_value", "base_val", "num"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vốn điều lệ đã đăng ký (bằng chữ)" name={["down_value", "base_val", "char"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vốn điều lệ sau khi giảm (bằng số)" name={["down_value", "new_base_val", "num"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Vốn điều lệ sau khi giảm (bằng chữ)" name={["down_value", "new_base_val", "char"]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Hình thức giảm vốn" name={["down_value", "type"]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      {/* </Form> */}
    </Form.Item>
  );
});

export default GiamVonDieuLe;
