import React from 'react';
import { Card, Row, Col, Form, Input, Button } from 'antd';
const AdminSetting = () => {

  const formRef = React.useRef();

  const onFinish = (val) => {
    console.log(val)
  }

  return (
    <Card title="Cài đặt">
      <Row gutter={[16, 12]}>
        <Col span={6}>
          <Form onFinish={onFinish} ref={formRef} layout='vertical'>
            <Form.Item label={<h3>Đổi mật khẩu</h3>}>
              <Form.Item name="old_password">
                <Input.Password placeholder='Mật khẩu hiện tại' />
              </Form.Item>
              <Form.Item name="new_password"> 
                <Input.Password placeholder='Mật khẩu mới' />
              </Form.Item>
              <Form.Item name="confirm_password">
                <Input.Password placeholder="Xác nhận mật khẩu mới" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">
                  Xác nhận
                </Button>
              </Form.Item>
            </Form.Item>
          </Form>
        </Col>
        <Col span={18}>

        </Col>
      </Row>
    </Card>
  );
};

export default AdminSetting;