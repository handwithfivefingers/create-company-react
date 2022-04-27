import React from "react";
import { DatePicker } from "antd";
import WithAuth from "src/components/HOC/WithAuth";
import { Outlet } from "react-router-dom";
const UserDashboard = () => {
  return <Outlet />;
};

export default WithAuth(UserDashboard, "user");
