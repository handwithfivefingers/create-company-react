import React from "react";
import { Outlet } from "react-router-dom";
import WithAuth from "src/components/HOC/WithAuth";

const UserDashboard = () => {
  return <Outlet />;
};

export default WithAuth(UserDashboard, "user");
