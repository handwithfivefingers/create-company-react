import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Modal, Tooltip, Drawer, Form, message } from 'antd';
import axios from '../../../config/axios';
import Tracking from '../../../components/Tracking';
import { MdCreditCard } from 'react-icons/md';
import { number_format } from 'src/helper/Common';
import { useSearchParams } from 'react-router-dom';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import dateformat from 'dateformat';
import styles from './styles.module.scss';
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
  const [drawer, setDrawer] = useState({
    visible: false,
    width: 0,
    data: null,
  });
  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = async () => {
    try {
      setLoading(true);
      let res = await axios.get('/order');

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
    var createDate = dateformat(date, 'yyyymmddHHmmss');
    var orderId = dateformat(date, 'HHmmss');

    let params = {
      createDate,
      orderId,
      amount: +record?.price * 100,
      orderInfo: record?._id,
    };

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
      message.error('something was wrong');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModal({
      ...modal,
      visible: false,
    });
    setDrawer((draw) => ({ ...draw, visible: false }));
  };

  const onEditOrder = (record) => {
    console.log('order', record);
    let { data, files } = record;
    setDrawer((draw) => ({
      ...draw,
      visible: true,
      width: 500,
      data: {
        data,
        files,
      },
    }));
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
            // 2 Case : 22/03/2022
            if (record.data.create_company) {
              return 'Thành lập doanh nghiệp';
            } else if (record.data.change_info) {
              return 'Thay đổi thông tin';
            } else if (record.data.pending) {
              return 'Tạm hoãn';
            } else if (record.data.dissolution) {
              return 'Giải thể';
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
          width={88}
          render={(v, record, i) => (
            <div className={styles.btnGroup}>
              <Tooltip title="Chỉnh sửa" color={'blue'}>
                <Button size="large" type="primary" shape="circle" onClick={() => onEditOrder(record)}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              {/* {!record.payment &&   */}
              <Tooltip title="Thanh toán" color={'blue'}>
                <Button
                  size="large"
                  type="primary"
                  shape="circle"
                  disabled={record.payment}
                  onClick={() => handlePurchase(record)}
                >
                  <MdCreditCard />
                </Button>
              </Tooltip>
              {/* // } */}
            </div>
          )}
        />
      </Table>

      <Modal visible={modal.visible} footer={null} bodyStyle={null} width={modal.width} onCancel={() => closeModal()}>
        {modal.component}
      </Modal>
      <FormDrawer {...drawer} closeModal={closeModal} />
    </div>
  );
};
export default UserOrder;

const FormDrawer = (props) => {
  return (
    <Drawer visible={props.visible} width={props.width} onClose={props.closeModal} destroyOnClose>
      <Form></Form>
    </Drawer>
  );
};
