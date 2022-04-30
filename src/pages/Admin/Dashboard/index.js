import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, message, Modal, Row, Space, Upload } from "antd";
import WithAuth from "src/components/HOC/WithAuth";
import React, { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import axios from "src/config/axios";
import dateformat from "dateformat";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState([]);
  // const [modal, setModal] = useState({
  //   visible: false,
  //   component: "",
  // });
  const formRef = useRef();
  const iframeRef = useRef();
  const onFinish = async (val) => {
    setLoading(true);
    const date = new Date();
    var createDate = dateformat(date, "yyyymmddHHmmss");
    var orderId = dateformat(date, "HHmmss");
    let params = {
      ...val,
      createDate,
      orderId,
    };
    const res = await axios.post(`/payment`, params);
    if (res.status === 200) {
      window.open(res.data.url);
    }
    setLoading(false);
  };

  const handleSendMailWithAttach = () => {
    let { email, attachments } = formRef.current.getFieldsValue();

    const form = new FormData();

    attachments?.fileList?.map((item) => {
      form.append("attachments", item.originFileObj);
    });
    form.append("email", email);

    setLoading(true);

    axios
      .post("/sendmail", form)
      .then((res) => {
        let msg = res.data.message;
        message.success(`${msg} -> Email: ${[res.data.info.accepted].join("")}`);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Form onFinish={onFinish} ref={formRef} layout="vertical" labelCol={{ span: 6 }}>
        <Row gutter={[16, 12]}>
          <Col span={24}>
            <h2>Cloudinary Uploader</h2>
            <Form.Item name="file">
              <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            {/* <Form.Item>
            <Button onClick={uploadFiles}> UP to cloud</Button>
          </Form.Item> */}
          </Col>
          <Col span={8}>
            <Card style={{ margin: 10 }} title="Chức năng thanh toán">
              <Form.Item name="amount">
                <InputNumber placeholder="Vui lòng nhập giá tiền" min={1} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name="orderDescription">
                <Input placeholder="Nội dung thanh toán" style={{ width: "100%" }} />
              </Form.Item>

              <Space style={{ display: "flex", justifyContent: "center" }}>
                <Form.Item>
                  <Button htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                </Form.Item>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ margin: 10 }} title="Chức năng gửi mail đính kèm">
              <Form.Item name="email" rules={[{ type: "email" }]}>
                <Input placeholder="Nhập email cần gửi" style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="attachments">
                <Upload>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              <Space style={{ display: "flex", justifyContent: "center" }}>
                <Form.Item>
                  <Button loading={loading} onClick={handleSendMailWithAttach}>
                    Submit
                  </Button>
                </Form.Item>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ margin: 10 }} title="Chức năng khác ...">
              <Form.Item name="amount" label="">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="orderDescription" label="Nội dung thanh toán">
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Space style={{ display: "flex", justifyContent: "center" }}>
                <Form.Item>
                  <Button disabled loading={loading}>
                    Submit
                  </Button>
                </Form.Item>
              </Space>
            </Card>
          </Col>
        </Row>
      </Form>
      {/* <Modal
        visible={modal.visible}
        destroyOnClose
        onCancel={() => setModal((state) => ({ ...state, visible: false, component: "" }))}
      >
        <iframe ref={iframeRef} title="Payment" src={modal.component} />
      </Modal> */}
    </div>
  );
};

export default AdminDashboard;
