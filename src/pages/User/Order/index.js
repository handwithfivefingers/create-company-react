import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Modal, Space } from "antd";
import axios from "../../../config/axios";
import Tracking from "../../../components/Tracking";
import { RiLoader4Line } from "react-icons/ri";
import { number_format } from "src/helper/Common";
import { useSearchParams } from "react-router-dom";
import dateformat from "dateformat";

const UserOrder = () => {
  const [state, setState] = useState({
    loading: false,
    data: [],
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({
    visible: false,
    width: 0,
    component: null,
  });
  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = async () => {
    try {
      setLoading(true);
      let res = await axios.get("/order");

      if (res.data.status === 200) {
        setData(res.data.data);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (record) => {
    setLoading(true);
    const date = new Date();
    var createDate = dateformat(date, "yyyymmddHHmmss");
    var orderId = dateformat(date, "HHmmss");
    let params = {
      ...record,
      createDate,
      orderId,
    };
    paymentService(params);
  };

  const paymentService = async (params) => {
    setLoading(true);
    const res = await axios.post(`/payment`, params);
    if (res.status === 200) {
      window.open(res.data.url);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setModal({
      ...modal,
      visible: false,
    });
  };

  return (
    <div>
      <Table dataSource={data} loading={loading} rowKey={(record) => record._id}>
        <Table.Column
          align="center"
          title="Đơn hàng"
          dataIndex="per_main"
          render={(val, record, i) => {
            return record.name;
          }}
        />
        <Table.Column
          align="center"
          title="Người đăng kí"
          render={(val, record, i) => {
            return record?.orderOwner.name;
          }}
        />

        <Table.Column
          width="350px"
          align="center"
          title="Loại hình"
          dataIndex=""
          render={(val, record, i) => {
            return (
              <div key={[val, i]} style={{ display: "flex", justifyContent: "flex-start" }}>
                <Space wrap size={[8, 16]} align="start">
                  {record?.products.map((item) => (
                    <Tag color="#108ee9" key={item.key}>
                      {item.name}
                    </Tag>
                  ))}
                </Space>
              </div>
            );
          }}
        />

        <Table.Column
          align="center"
          title="Giá tiền"
          render={(val, record, i) => {
            return <>{number_format(record?.price)} VND</>;
          }}
        />

        <Table.Column
          align="center"
          title="Thanh toán"
          dataIndex=""
          render={(val, record, i) => {
            return record?.payment === 1 ? (
              <Tag color="green">Đã thanh toán</Tag>
            ) : (
              <Tag color="volcano">Chưa thanh toán</Tag>
            );
          }}
        />

        <Table.Column
          align="center"
          render={(v, record, i) =>
            record?.payment === "0" ? <Button onClick={() => handlePurchase(record)}>Thanh toán</Button> : ""
          }
        />
      </Table>

      <Modal visible={modal.visible} footer={null} bodyStyle={null} width={modal.width} onCancel={() => closeModal()}>
        {modal.component}
      </Modal>
    </div>
  );
};
export default UserOrder;
