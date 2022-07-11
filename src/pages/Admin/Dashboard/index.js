import React, { useState, useEffect } from 'react';
import { List, Row, Skeleton, Avatar, Col, Card, message, Button } from 'antd';
import AdminDashboardService from 'src/service/AdminService/AdminDashboardService';
import { GrStatusWarning } from 'react-icons/gr';
import styles from './styles.module.scss';
import clsx from 'clsx';
const AdminDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [orderPayment, setOrderPayment] = useState([]);
  const [orderLatest, setOrderLatest] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = async () => {
    try {
      setLoading(true);
      let { data } = await AdminDashboardService.getLogs();
      // console.log(data);
      // if (data) setLogs(data?.data);
      let { _logs, out, error } = data.data;
      console.log(_logs, out, error);
      setLogs((state) => ({
        ...state,
        _logs,
        out,
        error,
      }));
    } catch (err) {
      let msg = 'Đã có lỗi xảy ra, vui lòng thử lại sau';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // const testPayment = () => {
  //   const date = new Date();
  //   var createDate = Date.parse(date).toString('yyyyMMddHHmmss');
  //   var orderId = Date.parse(date).toString('HHmmss');
  //   let params = {};
  //   params.createDate = createDate;
  //   params.orderId = orderId;
  //   params.amount = 100000 * 100;
  //   params.orderInfo = '6298edcfe6214c530533b255';
  //   AdminDashboardService.testPayment(params)
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         return (window.location.href = res.data.url);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <Row gutter={[16, 12]}>
      <Col span={16}>
        <Card title="Logs hệ thống" className="cc-card">
          <List
            className={clsx([styles.list, 'demo-loadmore-list'])}
            // loading={loading}
            itemLayout="horizontal"
            dataSource={logs._logs}
            renderItem={(item) => (
              <List.Item actions={[]} className={clsx([styles.listItem])}>
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        className={clsx([styles.ava])}
                        size={{ xs: 12, sm: 18, md: 24, lg: 30, xl: 36, xxl: 42 }}
                        icon={<GrStatusWarning />}
                      />
                    }
                    title={new Date(item?.createdAt).toString('dd/MM/yyyy HH:mm')}
                    description={<span style={{ wordBreak: 'break-word' }}>{JSON.stringify(item.error)}</span>}
                  />
                  {/* <div>Status: {item.error?.status} </div> */}
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Đơn hàng đã thanh toán">
          <List
            className="demo-loadmore-list"
            // loading={loading}
            itemLayout="horizontal"
            dataSource={orderPayment}
            renderItem={(item) => (
              <List.Item actions={[]}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={item.name?.last}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
        <Card title="Đơn hàng vừa tạo">
          <List
            className="demo-loadmore-list"
            // loading={loading}
            itemLayout="horizontal"
            dataSource={orderLatest}
            renderItem={(item) => (
              <List.Item actions={[]}>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={item.name?.last}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default AdminDashboard;
