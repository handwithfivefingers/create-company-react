import React, { Suspense, lazy } from 'react';
import { Layout, Spin } from 'antd';
import {
  RiBankLine,
  RiBarChartFill,
  RiChatPollLine,
  RiAdminFill,
  RiBriefcase4Fill,
  RiMailSettingsFill,
} from 'react-icons/ri';
import { BiHomeAlt } from 'react-icons/bi';
import { FcInfo } from 'react-icons/fc';
import { Navigate } from 'react-router-dom';

import CustomHeader from 'src/components/CustomHeader';
import Footer from 'src/components/Footer';
import Error from 'src/pages/_error';
import LoadingScreen from 'src/components/LoadingScreen';
import HomePage from 'src/pages/HomePage';
import Admin from 'src/pages/Admin';
import UserDashboard from 'src/pages/User';

// const HomePage = lazy(() => import('src/pages/HomePage'));
// const Admin = lazy(() => import('src/pages/Admin'));

const AdminDashboard = lazy(() => import('src/pages/Admin/Dashboard'));

const AdminMail = lazy(() => import('src/pages/Admin/AdminMail'));
const AdminOrder = lazy(() => import('src/pages/Admin/AdminOrder'));
const ClassComponentText = lazy(() => import('src/pages/Admin/AdminOrder/OrderItem'));
const AdminProduct = lazy(() => import('src/pages/Admin/AdminProduct'));
const AdminSetting = lazy(() => import('src/pages/Admin/AdminSetting'));
const AdminUser = lazy(() => import('src/pages/Admin/AdminUser'));

// const UserDashboard = lazy(() => import('src/pages/User'));
const UserProductPage = lazy(() => import('src/pages/User/Product'));
const UserProductItem = lazy(() => import('src/pages/User/Product/ProductItem'));
const UserOrder = lazy(() => import('src/pages/User/Order'));
const UserProfile = lazy(() => import('src/pages/User/Profile'));

const CCResult = lazy(() => import('src/pages/User/Result'));
const AdminAbout = lazy(() => import('src/pages/Admin/AdminAbout'));

const { Content } = Layout;

export const AdminRouter = [
  {
    path: '/admin',
    name: 'Dashboard',
    icon: <RiBankLine />,
  },
  {
    path: '/admin/product',
    name: 'Quản lý sản phẩm',
    icon: <RiBarChartFill />,
  },
  {
    path: '/admin/order',
    name: 'Orders',
    icon: <RiChatPollLine />,
  },
  {
    path: '/admin/user',
    name: 'Người dùng',
    icon: <RiBriefcase4Fill />,
  },
  {
    path: '/admin/mail',
    name: 'Mail',
    icon: <RiMailSettingsFill />,
  },
  {
    path: '/admin/setting',
    name: 'Cài đặt',
    icon: <RiAdminFill />,
  },
];

export const UserRouter = [
  {
    path: '/user',
    title: 'Dashboard',
    icon: <RiBankLine />,
  },
  {
    path: '/user/san-pham',
    title: 'Sản phẩm',
    icon: <RiBarChartFill />,
  },
  {
    path: '/user/order',
    title: 'Đơn hàng',
    icon: <RiChatPollLine />,
  },
  {
    path: '/user/profile',
    title: 'Tài khoản',
    icon: <RiAdminFill />,
  },
];

export const LAYOUT_ROUTER = ({ status, role }) => [
  {
    title: 'Đăng nhập',
    path: '/',
    icon: <BiHomeAlt />,
    element: (
      <Layout style={{ background: '#fff', minHeight: '100vh' }}>
        <CustomHeader auth={{ status, role }} />
        <Content className="site-layout">
          <Suspense fallback={<Spin spinning={true} />}>
            <HomePage />
          </Suspense>
        </Content>
        <Footer />
      </Layout>
    ),
  },
  {
    title: 'Admin',
    path: 'admin',
    element: <Admin status={status} />,
    children:
      status && role === 'admin' ? (
        [
          {
            index: true,
            icon: <RiBarChartFill />,
            element: <AdminDashboard />,
          },
          {
            path: 'product',
            title: 'Quản lý sản phẩm',
            icon: <RiBarChartFill />,
            element: <AdminProduct />,
          },
          {
            path: 'order',
            title: 'Orders',
            icon: <RiChatPollLine />,
            children: [
              {
                index: true,
                element: <AdminOrder />,
              },
              {
                path: ':slug',
                element: <ClassComponentText />,
              },
            ],
          },
          {
            path: 'user',
            title: 'Người dùng',
            icon: <RiBriefcase4Fill />,
            element: <AdminUser />,
          },
          {
            path: 'mail',
            title: 'Mail',
            icon: <RiMailSettingsFill />,
            element: <AdminMail />,
          },
          {
            path: 'setting',
            title: 'Cài đặt',
            icon: <RiAdminFill />,
            element: <AdminSetting />,
          },
          {
            path: 'about',
            title: 'Author',
            icon: <FcInfo />,
            element: <AdminAbout />,
          },

          {
            path: '*',
            element: <Error />,
          },
        ]
      ) : (
        <Navigate to="/" />
      ),
  },
  {
    title: 'User',
    path: 'user',
    element: <UserDashboard status={status} />,
    children: status ? (
      [
        {
          path: 'san-pham',
          title: 'Sản phẩm',
          icon: <RiBarChartFill />,
          children: [
            {
              index: true,
              element: <UserProductPage />,
            },
            {
              path: ':slug',
              element: <UserProductItem />,
            },
          ],
        },
        {
          path: 'order',
          title: 'Orders',
          icon: <RiChatPollLine />,
          element: <UserOrder />,
        },
        {
          path: 'result',
          title: 'Kết quả',
          element: <CCResult />,
        },
        {
          path: 'profile',
          title: 'Tài khoản',
          icon: <RiAdminFill />,
          element: <UserProfile />,
        },
        {
          path: '*',
          element: <Error />,
        },
      ]
    ) : (
      <Navigate to="/" />
    ),
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];
