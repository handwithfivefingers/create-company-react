import { Form } from "antd";
import clsx from "clsx";
import React from "react";
import CCInput from "src/components/CCInput";
import styles from "../styles.module.scss";

const GiaiThe = (props) => {
  return (
    <Form.Item
      label="Giải thể"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <CCInput name={["dissolution", "approve", "company_name"]} label="Tên doanh nghiệp (ghi bằng chữ in hoa)" />

      <CCInput name={["dissolution", "approve", "mst"]} label="Mã số doanh nghiệp/Mã số thuế" />

      <CCInput name={["dissolution", "approve", "time_provide"]} label="Ngày cấp" type="date" />

      <CCInput name={["dissolution", "approve", "place_provide"]} label="Nơi cấp" />
      <CCInput
        name={["dissolution", "approve", "opt_code"]}
        label="Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)"
      />

      <CCInput name={["dissolution", "approve", "company_address"]} label="Địa chỉ trụ sở chính" />

      <CCInput name={["dissolution", "approve", "reason"]} label="Lý do giải thể" />

      <CCInput name={["dissolution", "approve", "representative"]} label="Ông (bà) Chủ sở hữu/đại diện chủ sở hữu" />
    </Form.Item>
  );
};

export default GiaiThe;
