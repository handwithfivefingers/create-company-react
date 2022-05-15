import React, { forwardRef, useEffect } from "react";
import { Form, Input, Select, Card, Row, Col } from "antd";
import styles from "../DaiDienPhapLuat/styles.module.scss";
import clsx from "clsx";
const GiamVonDieuLe = forwardRef((props, ref) => {
  useEffect(() => {
    if (ref) {
      ref.current.setFieldsValue({
        change_info: {
          down_authorized_capital: {
            type: "Hoàn trả vốn góp",
          },
        },
      });
    }
  }, [ref]);

  return (
    <Form.Item
      label={<h4>Đăng ký thay đổi vốn điều lệ</h4>}
      // bordered={false}
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <Form ref={ref} layout="vertical"> */}
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <Form.Item label="Tên doanh nghiệp" name={["change_info", "down_authorized_capital", "company_name"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Mã số doanh nghiệp/ mã số thuế" name={["change_info", "down_authorized_capital", "mst"]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Vốn điều lệ đã đăng ký (bằng số)"
            name={["change_info", "down_authorized_capital", "base_val", "num"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Vốn điều lệ đã đăng ký (bằng chữ)"
            name={["change_info", "down_authorized_capital", "base_val", "char"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Vốn điều lệ sau khi giảm (bằng số)"
            name={["change_info", "down_authorized_capital", "new_base_val", "num"]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Vốn điều lệ sau khi giảm (bằng chữ)"
            name={["change_info", "down_authorized_capital", "new_base_val", "char"]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Hình thức giảm vốn" name={["change_info", "down_authorized_capital", "type"]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      {/* </Form> */}
    </Form.Item>
  );
});

export default GiamVonDieuLe;
