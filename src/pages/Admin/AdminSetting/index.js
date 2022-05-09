import React, { forwardRef, useEffect, useState, useRef } from "react";
import { Card, Row, Col, Form, Input, Button, Tabs, Select, message } from "antd";
import AdminMailService from "src/service/AdminService/AdminMailService";

const { TabPane } = Tabs;

const ChangePassword = forwardRef((props, ref) => {
  return (
    <Form onFinish={props?.passwordSubmit} ref={ref} layout="vertical">
      <Form.Item label={<h3>Đổi mật khẩu</h3>}>
        <Form.Item name="old_password">
          <Input.Password placeholder="Mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item name="new_password">
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item name="confirm_password">
          <Input.Password placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Xác nhận</Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
});

const SettingMail = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTemplateMail();
  }, []);

  const fetchTemplateMail = async (page = 1) => {
    setLoading(true);
    let params = { page: page };
    try {
      let res = await AdminMailService.getTemplate(params);
      if (res.data.status === 200) {
        setData(res.data.data._template);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form ref={ref} onFinish={props.mailSubmit} layout="vertical">
      <Form.Item label={"Mail đăng kí"} name="mail_register">
        <Select>
          {data.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={"Mail Thanh Toán"} name="mail_payment">
        <Select>
          {data.map((item) => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
});

const AdminSetting = () => {
  const formRef = useRef();
  const mailRef = useRef();

  const passwordSubmit = (val) => {
    console.log(val);
  };

  const mailSubmit = (val) => {
    console.log(val);
  };

  const tabList = [
    {
      name: "Đổi mật khẩu",
      content: <ChangePassword passwordSubmit={passwordSubmit} ref={formRef} />,
    },
    {
      name: "Mail",
      content: <SettingMail mailSubmit={mailSubmit} ref={mailRef} />,
    },
  ];

  return (
    <Card title="Cài đặt">
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            {tabList.map((tab) => (
              <TabPane tab={tab.name} key={tab.name}>
                {tab.content}
              </TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
    </Card>
  );
};

export default AdminSetting;
