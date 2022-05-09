import {
  RiBankLine,
  RiBarChartFill,
  RiChatPollLine,
  RiAdminFill,
  RiBriefcase4Fill,
  RiMailSettingsFill,
} from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import React from "react";
import { Layout } from "antd";
import CustomHeader from "src/components/CustomHeader";
import Footer from "src/components/Footer";

import { Navigate, Outlet } from "react-router-dom";
import HomePage from "src/pages/HomePage";
import Admin from "src/pages/Admin";
import AdminDashboard from "src/pages/Admin/Dashboard";

import AdminMail from "src/pages/Admin/AdminMail";
import AdminOrder from "src/pages/Admin/AdminOrder";
import ClassComponentText from "src/pages/Admin/AdminOrder/OrderItem";
import AdminProduct from "src/pages/Admin/AdminProduct";
import AdminSetting from "src/pages/Admin/AdminSetting";
import AdminUser from "src/pages/Admin/AdminUser";

import UserDashboard from "src/pages/User";
import UserProductPage from "src/pages/User/Product";
import UserProductItem from "src/pages/User/Product/ProductItem";
import UserOrder from "src/pages/User/Order";
import Error from "src/pages/_error";
const { Content } = Layout;
export const AdminRouter = [
  {
    path: "/admin",
    name: "Dashboard",
    icon: <RiBankLine />,
  },
  {
    path: "/admin/product",
    name: "Quản lý sản phẩm",
    icon: <RiBarChartFill />,
  },
  {
    path: "/admin/order",
    name: "Orders",
    icon: <RiChatPollLine />,
  },
  {
    path: "/admin/user",
    name: "Người dùng",
    icon: <RiBriefcase4Fill />,
  },
  {
    path: "/admin/mail",
    name: "Mail",
    icon: <RiMailSettingsFill />,
  },
  {
    path: "/admin/setting",
    name: "Cài đặt",
    icon: <RiAdminFill />,
  },
];

export const UserRouter = [
  {
    path: "/user",
    title: "Dashboard",
    icon: <RiBankLine />,
  },
  {
    path: "/user/san-pham",
    title: "Sản phẩm",
    icon: <RiBarChartFill />,
  },
  {
    path: "/user/order",
    title: "Đơn hàng",
    icon: <RiChatPollLine />,
  },
  {
    path: "/user/profile",
    title: "Tài khoản",
    icon: <RiAdminFill />,
  },
];

export const LAYOUT_ROUTER = ({ status, role }) => [
  {
    title: "Đăng nhập",
    path: "/",
    icon: <BiHomeAlt />,
    element: (
      <Layout style={{ background: "#fff", minHeight: "100vh" }}>
        <CustomHeader auth={{ status, role }} />
        <Content className="site-layout">
          <HomePage />
        </Content>
        <Footer />
      </Layout>
    ),
  },
  {
    title: "Admin",
    path: "/admin",
    element: <Admin status={status}  />,
    children:
      status && role === "admin" ? (
        [
          {
            index: true,
            icon: <RiBarChartFill />,
            element: <AdminDashboard />,
          },
          {
            path: "product",
            title: "Quản lý sản phẩm",
            icon: <RiBarChartFill />,
            element: <AdminProduct />,
          },
          {
            path: "order",
            title: "Orders",
            icon: <RiChatPollLine />,
            children: [
              {
                index: true,
                element: <AdminOrder />,
              },
              {
                path: ":slug",
                element: <ClassComponentText />,
              },
            ],
          },
          {
            path: "user",
            title: "Người dùng",
            icon: <RiBriefcase4Fill />,
            element: <AdminUser />,
          },
          {
            path: "mail",
            title: "Mail",
            icon: <RiMailSettingsFill />,
            element: <AdminMail />,
          },
          {
            path: "setting",
            title: "Cài đặt",
            icon: <RiAdminFill />,
            element: <AdminSetting />,
          },
          {
            path: "*",
            element: <Error />,
          },
        ]
      ) : (
        <Navigate to="/" />
      ),
  },
  {
    title: "User",
    path: "/user",
    element: <UserDashboard status={status} />,
    children: status ? (
      [
        {
          path: "san-pham",
          title: "Sản phẩm",
          icon: <RiBarChartFill />,
          children: [
            {
              index: true,
              element: <UserProductPage />,
            },
            {
              path: ":slug",
              element: <UserProductItem />,
            },
          ],
        },
        {
          path: "order",
          title: "Orders",
          icon: <RiChatPollLine />,
          element: <UserOrder />,
        },
        // {
        //   path: "setting",
        //   title: "Đổi mật khẩu",
        //   icon: <RiAdminFill />,
        //   element: <AdminSetting />,
        // },
        {
          path: "*",
          element: <Error />,
        },
      ]
    ) : (
      <Navigate to="/" />
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];
