import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, InputNumber, message, Row, Space, Upload } from "antd";
import WithAuth from "src/components/HOC/WithAuth";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "src/config/axios";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState([]);
  const formRef = React.useRef();

  const onFinish = async (val) => {
    setLoading(true);
    const res = await axios.post(`/api/payment`, val);
    // console.log(res);
    if (res.status === 200) {
      return (window.location.href = res.data.url);
    }
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
      .post("/api/sendmail", form)
      .then((res) => {
        let msg = res.data.message;
        message.success(`${msg} -> Email: ${[res.data.info.accepted].join("")}`);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const uploadFiles = async (e) => {
    e.preventDefault();
    axios
      .post("/api/upload/cloud")
      .then((res) => {
        const sign = res.data;
        const formData = new FormData();
        let { file } = formRef.current.getFieldsValue();
        let all = file?.fileList?.map((item) => {
          formData.append("file", item.originFileObj);
          formData.append("api_key", sign.apikey);
          formData.append("timestamp", sign.timestamp);
          formData.append("signature", sign.signature);
          formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
          formData.append("folder", "pdf_file");
          return fetch(`https://api.cloudinary.com/v1_1/${sign.cloudname}/auto/upload`, {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              return response.text();
            })
            .then((data) => {
              return JSON.parse(data);
            });
        });

        Promise.all(all)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <Form onFinish={onFinish} ref={formRef} layout="vertical" labelCol={{ span: 6 }}>
      <Row gutter={[16, 12]}>
        <Col span={24}>
          <h2>Cloudinary Uploader</h2>
          <Form.Item name="file">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button onClick={uploadFiles}> UP to cloud</Button>
          </Form.Item>
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
  );
};

export default AdminDashboard;
