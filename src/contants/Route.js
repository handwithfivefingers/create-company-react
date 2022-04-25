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

import { Navigate, Outlet } from "react-router";
import HomePage from "../pages/HomePage";
import Admin from "../pages/Admin";
import AdminMail from "../pages/Admin/AdminMail";
import AdminOrder from "../pages/Admin/AdminOrder";
import AdminOrderItem from "../pages/Admin/AdminOrder/OrderItem";

import AdminProduct from "../pages/Admin/AdminProduct";
import AdminSetting from "../pages/Admin/AdminSetting";
import AdminUser from "../pages/Admin/AdminUser";
import WithAuth from "src/components/HOC/WithAuth";

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
    name: "Đổi mật khẩu",
    icon: <RiAdminFill />,
  },
];

// export const UserRouter = [
//   {
//     path: "/user",
//     name: "Dashboard",
//     icon: <RiBankLine />,
//   },
//   {
//     path: "/user/san-pham",
//     name: "Sản phẩm",
//     icon: <RiBarChartFill />,
//   },
//   {
//     path: "/user/order",
//     name: "Đơn hàng",
//     icon: <RiChatPollLine />,
//   },
//   {
//     path: "/user/profile",
//     name: "Tài khoản",
//     icon: <RiAdminFill />,
//   },
// ];

export const LAYOUT_ROUTER = ({ status, role }) => [
  {
    title: "Đăng nhập",
    path: "/",
    icon: <BiHomeAlt />,
    element: status ? <Navigate to={`/${role}`} /> : <HomePage />,
  },
  {
    title: "Admin",
    path: "/admin",
    element: <Admin status={status} />,
    children:
      status && role === "admin" ? (
        [
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
                element: <AdminOrderItem />,
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
            title: "Đổi mật khẩu",
            icon: <RiAdminFill />,
            element: <AdminSetting />,
          },
        ]
      ) : (
        <Navigate to="/" />
      ),
  },
];
