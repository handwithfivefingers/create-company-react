import { Form } from "antd";
import clsx from "clsx";
import React, { forwardRef } from "react";
import CCInput from "src/components/CCInput";
import styles from "../CreateCompany.module.scss";


const DiaChiTruSoChinh = forwardRef((props, ref) => {

  const { BASE_FORM, current } = props;

  return (
    <Form.Item
      label={<h2>Địa chỉ đặt trụ sở</h2>}
      className={clsx([
        styles.hide,
        {
          [styles.visible]: current === 6,
        },
      ])}
    >
      <CCInput name={[...BASE_FORM, "company_core", "address"]} label="Địa chỉ trụ sở chính" />

      <CCInput name={[...BASE_FORM, "company_core", "address_opt_1"]} label="Địa chỉ chi nhánh (nếu có)" />

      <CCInput name={[...BASE_FORM, "company_core", "address_opt_2"]} label="Địa chỉ văn phòng đại diện (nếu có)" />
    </Form.Item>
  );
});

export default DiaChiTruSoChinh;
