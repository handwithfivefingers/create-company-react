import { Spin, Space } from 'antd';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import WithAuth from 'src/components/HOC/WithAuth';

const Admin = (props) => {
  return (
    <Suspense
      fallback={
        <div className="container spin-suspense">
          <Space align="center">
            <Spin spinning={true} tip="Loading..." delay={500} />
          </Space>
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
};

export default WithAuth(Admin, 'admin');
