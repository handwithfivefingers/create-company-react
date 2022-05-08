import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Modal } from "antd";
import axios from "../../../config/axios";
import Tracking from "../../../components/Tracking";
import { RiLoader4Line } from "react-icons/ri";
import { number_format } from "src/helper/Common";
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

  const getScreenData = () => {
    setLoading(true);
    axios
      .get("/order")
      .then((res) => {
        if (res.data.status === 200) {
          setData(res.data.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  // const handleTracking = () => {
  //   setModal({
  //     ...modal,
  //     width: "50%",
  //     visible: true,
  //     component: <Tracking />,
  //   });
  // };
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
      <Table dataSource={data} loading={loading}>
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
          align="center"
          title="Loại hình"
          dataIndex=""
          render={(val, record, i) => {
            // 2 Case : 22/03/2022
            if (record.data.create_company) {
              return "Thành lập doanh nghiệp";
            }
            if (record.data.change_info) {
              return "Thay đổi thông tin";
            }
          }}
        />

        <Table.Column
          align="center"
          title="Giá tiền"
          render={(val, record, i) => {
            return <>{number_format(record?.price)} VND</>;
          }}
        />

        {/* <Table.Column
          title="Progress"
          dataIndex=""
          align="center"
          render={(val, record, i) => (
            <Button type="text" onClick={() => handleTracking(record)}>
              <RiLoader4Line />
            </Button>
          )}
        /> */}

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
          render={(v, record, i) =>  record?.payment === "0" ? (<Button onClick={() => handlePurchase(record)}>Thanh toán</Button>) : ''}
        />
      </Table>

      <Modal visible={modal.visible} footer={null} bodyStyle={null} width={modal.width} onCancel={() => closeModal()}>
        {modal.component}
      </Modal>
    </div>
  );
};
export default UserOrder;
