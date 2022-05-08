import { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, message, Modal, Space, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import CCInput from "src/components/CCInput";
import Tracking from "src/components/Tracking";
import axios from "src/config/axios";
import { number_format } from "src/helper/Common";
import AdminOrderService from "src/service/AdminService/AdminOrderService";

const AdminOrder = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [childModal, setChildModal] = useState({
    visible: false,
    component: null,
    width: 0,
  });
  const formRef = useRef();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = (page) => {
    // page -> number
    let { company, user } = formRef?.current.getFieldsValue();
    let params = {
      page,
      company,
      user,
    };

    setLoading(true);
    console.log(params);
    AdminOrderService.getOrder(params)
      .then((res) => {
        let { data, status } = res.data;
        setData(data);
        if (status !== 200) {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const handlePayment = (record) => {
    console.log(record);
    setLoading(true);
    axios
      .get(`/api/payment/${record._id}`)
      .then((res) => {
        if (res.data.status === 200) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err))
      .finally(setLoading(false));
  };

  const onHandleDelete = (record) => {
    // console.log("delete", record);
    Modal.confirm({
      title: "Xác thực",
      content: "Bạn có muốn xóa ?",
      onOk() {
        axios
          .post(`/api/admin/orders/delete/${record._id}`)
          .then((res) => {
            // console.log(res);
            if (res.data.status === 200) {
              message.success(res.data.message);
            } else {
              message.error(res.data.message);
            }
          })
          .finally(() => {
            let { current_page } = data;
            fetchOrders(current_page);
          });
      },
    });
  };

  const onFilter = (val) => {
    let { current_page } = data;
    fetchOrders(current_page);
  };

  const checkProgress = (record) => {
    setChildModal({
      visible: true,
      width: "100%",
      component: (
        <Tracking
          data={record}
          // handleSendMailWithAttach={(output) => handleSendMailWithAttach(output)}
          onFinishScreen={(attachments, content, email) => {
            handleSendMailWithAttach(attachments, content, email);
            onClose();
          }}
        />
      ),
    });
  };

  const handleSendMailWithAttach = (attachments, content, email) => {
    const form = new FormData();
    attachments?.fileList?.map((item) => {
      form.append("attachments", item.originFileObj);
    });
    form.append("content", content);
    form.append("email", email);
    setLoading(true);
    console.log("running sendmail");
    axios
      .post("/api/sendmail", form)
      .then((res) => {
        let msg = res.data.message;
        message.success(`${msg} -> Email: ${[res.data.info.accepted].join("")}`);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const onClose = () => {
    setChildModal({
      ...childModal,
      visible: false,
    });
  };

  return (
    <>
      <Card
        className="cc-card"
        title="Quản lý đơn hàng"
        extra={[
          <Form key="filter" layout="vertical" ref={formRef} onFinish={onFilter}>
            <Space>
              <CCInput type="text" name="company" placeholder="Tên công ty" />
              <CCInput type="text" name="user" placeholder="Người dùng" />
              <Form.Item label=" ">
                <Button htmlType="submit">Tìm kiếm</Button>
              </Form.Item>
            </Space>
          </Form>,
        ]}
      >
        <Divider />

        <Table
          dataSource={data._order}
          loading={loading}
          size="small"
          bordered
          pagination={{
            current: data.current_page,
            // pageSize: tableDataPaginate.per_page,
            pageSize: 10,
            total: data.count,
            onChange: (page, pageSize) => {
              fetchOrders(page);
            },
            showSizeChanger: false,
          }}
          rowKey={(record) => record._id}
          scroll={{ x: 768 }}
        >
          <Table.Column
            title="Đơn hàng"
            render={(val, record, i) => {
              return record?.name;
            }}
          />
          <Table.Column
            title="Người đăng kí"
            render={(val, record, i) => {
              return record?.orderOwner.email;
            }}
          />
          <Table.Column
            title="Sản phẩm"
            className="inline"
            render={(val, record, i) => {
              return record?.products?.map((item) => (
                <span key={item.name}>
                  {item.name}
                  <br />
                </span>
              ));
            }}
          />
          <Table.Column
            title="Giá tiền"
            render={(val, record, i) => {
              return <>{number_format(record?.price)} VND</>;
            }}
          />
          <Table.Column
            title="Tiến độ"
            render={(val, record, i) => {
              return (
                <Tooltip
                  title={
                    <>
                      Step: {record?.track.step} <br />
                      Status: {record?.track.status}
                    </>
                  }
                >
                  <Button type="text" onClick={() => checkProgress(record)}>
                    {record?.track.step}
                  </Button>
                </Tooltip>
              );
            }}
          />
          <Table.Column
            title="Thanh toán"
            render={(val, record, i) => {
              return record?.payment === 1 ? (
                <Tag color="green">Đã thanh toán</Tag>
              ) : (
                <Tag color="volcano">Chưa thanh toán</Tag>
              );
            }}
          />
          <Table.Column
            title="Ngày tạo"
            render={(val, record, i) => {
              return record?.createdAt.substring(0, 10);
            }}
          />
          <Table.Column
            title="Thao tác"
            render={(val, record, i) => {
              return (
                <Space>
                  <Button>
                    <Link to={`/admin/order/${record?._id}`}>
                      <FormOutlined />
                    </Link>
                  </Button>
                  <Button onClick={() => onHandleDelete(record)} icon={<DeleteOutlined />} />
                </Space>
              );
            }}
          />
        </Table>
      </Card>
      <Modal footer={null} onCancel={() => onClose()} visible={childModal.visible} width={childModal.width}>
        {childModal.component}
      </Modal>
    </>
  );
};

export default AdminOrder;
