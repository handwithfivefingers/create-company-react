import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import AdminUserService from "src/service/AdminService/AdminUserService";
import styles from "./styles.module.scss";
const AdminUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    AdminUserService.getUser()
      .then((res) => {
        let { status, data } = res.data;
        if (status === 200) {
          setData(data._user);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Card title="Quản lý người dùng">
      <Table
        dataSource={data}
        scroll={{ x: 768 }}
        pagination={{
          className: styles.pagination,
        }}
        rowKey={(record) => record._id}
        size="small"
      >
        <Table.Column
          title="Tên người dùng"
          className={styles.inline}
          width={"25%"}
          render={(v, record, i) => record.name}
        />
        <Table.Column title="Email" render={(v, record, i) => record.email} />
        <Table.Column title="Số điện thoại" className={styles.inline} render={(v, record, i) => record.phone} />
        <Table.Column title="Role" width={"50px"} render={(v, record, i) => record.role} />
        <Table.Column
          title="Ngày khởi tạo"
          width={"130px"}
          render={(v, record, i) => record.createdAt.substring(0, 10)}
        />
      </Table>
    </Card>
  );
};

export default AdminUser;
