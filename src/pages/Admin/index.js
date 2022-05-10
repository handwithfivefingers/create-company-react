import React from "react";
import { Outlet } from "react-router-dom";
import WithAuth from "src/components/HOC/WithAuth";

const Admin = (props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default WithAuth(Admin, "admin");
