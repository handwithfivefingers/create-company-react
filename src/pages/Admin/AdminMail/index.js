import React, { useState, useEffect } from "react";
import { Table, Button, message, Drawer, Input, Form, Row, Col, Space, Tooltip, Card } from "antd";
import styles from "./styles.module.scss";
// import { useRouter } from "next/router";
import axios from "../../../config/axios";
import parser from "html-react-parser";
import { DeleteOutlined, FormOutlined, PlusSquareOutlined } from "@ant-design/icons";
import TemplateMail from "../../../components/Form/TemplateMail";
function ListTemplateMail(props) {
  // const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState({
    title: "",
    visible: false,
    component: null,
    width: 0,
  });
  const fetchTemplateMail = (page = 1) => {
    console.log(page);
    setLoading(true);
    let params = { page: page };
    axios
      .get("/admin/template", { params })
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTemplateMail();
  }, []);

  const addTemplate = () => {
    setDrawer({
      ...drawer,
      title: "Thêm mẫu mới",
      visible: true,
      width: "500px",
      component: <TemplateMail onClose={onClose} type={1} onFinishScreen={() => fetchTemplateMail()} />,
    });
  };

  const editTemplate = (record) => {
    setDrawer({
      ...drawer,
      title: "Chỉnh sửa mẫu",
      visible: true,
      width: "500px",
      component: (
        <TemplateMail
          data={record}
          content={record.content}
          onClose={onClose}
          type={2}
          onFinishScreen={() => fetchTemplateMail()}
        />
      ),
    });
  };
  const onClose = () => {
    // fetchTemplateMail();
    setDrawer({
      ...drawer,
      visible: false,
    });
  };

  const deleteTemplate = (record) => {
    setLoading(true);
    axios
      .post(`/api/admin/template/delete/${record._id}`)
      .then((res) => {
        if (res.data.status === 200) {
          message.success(res.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
        fetchTemplateMail();
      });
  };

  return (
    <Card
      style={{ marginTop: 10 }}
      title="Template Mail"
      extra={[
        <Button key="add-template" type="text" onClick={() => addTemplate()} icon={<PlusSquareOutlined />}>
          Thêm mới
        </Button>,
      ]}
    >
      {/* <div className={styles.mail}> */}
      {/* <div className={styles.header}>
					<div className={styles.title}>Danh sách Mẫu Email</div>
					<div className={styles.action}></div>
				</div> */}
      <Table
        size="small"
        bordered
        dataSource={data._template}
        loading={loading}
        pagination={{
          current: data.current_page,
          pageSize: 10,
          total: data.count,
          onChange: (page, pageSize) => {
            fetchTemplateMail(page);
          },
          showSizeChanger: false,
        }}
      >
        <Table.Column
          title="Mẫu Email"
          dataIndex="name"
          render={(val, record, i) => (
            <Tooltip title={record.name} color={"#108ee9"} key={"#108ee9"}>
              {record.name}
            </Tooltip>
          )}
        />
        <Table.Column title="Subject" dataIndex="subject" render={(val, record, i) => record.subject} />
        <Table.Column
          title="Nội dung Email"
          width="300px"
          render={(val, record, i) => (
            <div className={styles.tableContent}>
              <Tooltip title={parser(record?.content || "")} color={"#108ee9"} key={"#108ee9"}>
                {parser(record?.content || "")}{" "}
              </Tooltip>
            </div>
          )}
        />

        <Table.Column
          title="Action"
          width={100}
          render={(val, record, i) => (
            <Row>
              <Col span={12}>
                <Button type="text" size="small" onClick={() => editTemplate(record)}>
                  <FormOutlined />
                </Button>
              </Col>
              <Col span={12}>
                <Button type="text" size="small" onClick={() => deleteTemplate(record)}>
                  <DeleteOutlined />
                </Button>
              </Col>
            </Row>
          )}
        />
      </Table>
      <Drawer
        title={drawer.title}
        width={720}
        onClose={onClose}
        visible={drawer.visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {drawer.component}
      </Drawer>
      {/* </div> */}
    </Card>
  );
}

export default ListTemplateMail;
