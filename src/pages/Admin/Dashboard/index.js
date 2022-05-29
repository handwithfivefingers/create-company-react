import React, { useState, useEffect } from "react";
import { List, Row, Skeleton, Avatar, Col, Card, message } from "antd";
import AdminDashboardService from "src/service/AdminService/AdminDashboardService";

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
      // setLogs(data);
      console.log(data?.data);
      if (data) setLogs(data?.data);
    } catch (err) {
      let msg = "Đã có lỗi xảy ra, vui lòng thử lại sau";
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row gutter={[16, 12]}>
      <Col span={16}>
        <Card title="Logs hệ thống" className="cc-card">
          <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            dataSource={logs}
            renderItem={(item) => (
              <List.Item actions={[]}>
                <Skeleton avatar title={false} loading={loading} active>
                  <List.Item.Meta
                    avatar={<Avatar src={item?.picture?.large} />}
                    title={item?.createdAt}
                    description="Chức năng quản lý request gửi về từ server"
                  />
                  <div>Status: {item.error?.status} </div>
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
            loading={loading}
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
            loading={loading}
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
