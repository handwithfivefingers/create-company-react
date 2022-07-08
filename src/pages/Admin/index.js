import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import WithAuth from 'src/components/HOC/WithAuth';
import LoadingScreen from 'src/components/LoadingScreen';

const Admin = (props) => {
  return (
    <Suspense fallback={<Spin spinning={true} />}>
      <Outlet />
    </Suspense>
  );
};

export default WithAuth(Admin, 'admin');
