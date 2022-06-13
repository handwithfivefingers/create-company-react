import { Button, message, Modal, Space, Table, Tag } from "antd";
import dateformat from "dateformat";
import { useEffect, useState } from "react";
import { TbFreeRights } from "react-icons/tb";
import { number_format } from "src/helper/Common";
import axios from "../../../config/axios";
const UserOrder = () => {
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

  const handlePayment = (record) => {
    // setLoading(true);
    const date = new Date();
    var createDate = dateformat(date, "yyyymmddHHmmss");
    var orderId = dateformat(date, "HHmmss");

    let params = {
      createDate,
      orderId,
      amount: +record?.price*100,
      orderInfo: record?._id,
    };
    // console.log(record);
    // params.amount = 100000*100;
    // params.orderInfo = "Test payment";
    // AdminDashboardService.testPayment(params)
    //   .then((res) => {
    //     if (res.data.status === 200) {
    //       return (window.location.href = res.data.url);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    return paymentService(params);
  };

  const paymentService = async (params) => {
    setLoading(true);
    try {
      const res = await axios.post(`/payment`, params);
      if (res.status === 200) {
        window.open(res.data.url);
      }
    } catch (err) {
      console.log(err);
      message.error("something was wrong");
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
      <Table
        size="small"
        bordered
        dataSource={data}
        loading={loading}
        rowKey={(record) => record._id}
        scroll={{ x: 1000 }}
      >
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
            record?.payment === 0 ? (
              <Button type="primary" onClick={() => handlePayment(record)}>
                <TbFreeRights />
              </Button>
            ) : (
              ""
            )
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
