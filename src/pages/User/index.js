import React from "react";
import { DatePicker } from "antd";
import WithAuth from "src/components/HOC/WithAuth";
const UserDashboard = () => {
  return (
    <div>
      <DatePicker />
    </div>
  );
};

export default WithAuth(UserDashboard, "user");
