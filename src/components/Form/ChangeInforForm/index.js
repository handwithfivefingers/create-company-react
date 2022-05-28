import { Form, Select } from "antd";
import clsx from "clsx";
import React, { forwardRef, useEffect, useState } from "react";
import DaiDienPhapLuat from "./DaiDienPhapLuat";
import styles from "./DaiDienPhapLuat/styles.module.scss";
import DaiDienToChuc from "./DaiDienToChuc";
import DiaChiTruSoChinh from "./DiaChiTruSoChinh";
import GiamVonDieuLe from "./GiamVonDieuLe";
import HopDongChuyenNhuong from "./HopDongChuyenNhuong";
import NganhNgheKinhDoanh from "./NganhNgheKinhDoanh";
import TangVonDieuLe from "./TangVonDieuLe";
import TenDoanhNghiep from "./TenDoanhNghiep";
import ThongTinDangKyThue from "./ThongTinDangKyThue";


const ChangeInforForm = forwardRef((props, ref) => {
  const [productSelect, setProductSelect] = useState("");
  const [selectType, setSelectType] = useState([]);

  const checkType = (type, i, ref) => {
    switch (type) {
      case "2":
        return <DaiDienPhapLuat key={[type, i]} current={props.current} index={i + 1} ref={ref} />;
      case "3":
        return <TenDoanhNghiep key={[type, i]} current={props.current} index={i + 1} ref={ref} />;
      case "4":
        return <GiamVonDieuLe key={[type, i]} current={props.current} index={i + 1} ref={ref} />;
      case "5":
        return <TangVonDieuLe key={[type, i]} current={props.current} index={i + 1} ref={ref} />;
      case "7":
        return <NganhNgheKinhDoanh key={[type, i]} current={props.current} index={i + 1} ref={ref} />;
      case "1":
        return <DiaChiTruSoChinh key={[type, i]} current={props.current} index={i + 1} ref={ref} />;
      case "6":
        return <HopDongChuyenNhuong key={[type, i]} current={props.current} index={i + 1} ref={ref} />;
      case "8":
        return <DaiDienToChuc key={[type, i]} current={props.current} index={i + 1} ref={ref} />;
      case "9":
        return <ThongTinDangKyThue key={[type, i]} current={props.current} index={i + 1} ref={ref} />;
      default:
        return null;
    }
  };

  const handleOnChange = (val, opt) => {
    setSelectType(opt);
    if (props.onFinishScreen) {
      props.onFinishScreen(opt);
    }
  };
  useEffect(() => {
    console.log(ref?.current.getFieldsValue());
  }, []);

  return (
    <Form ref={ref} layout="vertical" name="change_info">
      <Form.Item
        name={["selectProduct"]}
        label="Chọn loại hình doanh nghiệp"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select onChange={(val) => setProductSelect(val)} placeholder="Chọn loại hình doanh nghiệp">
          {props.data?.map((item) => {
            return (
              <Select.Option key={item._id} value={item._id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name={["selectChildProduct"]}
        label="Chọn thông tin thay đổi"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select
          showSearch
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          listHeight={300}
          placeholder="Please select"
          optionFilterProp="children"
          onChange={handleOnChange}
          filterOption={(input, option) => {
            return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          }}
        >
          {productSelect &&
            props.data?.map((item) => {
              return (
                item._id.includes(productSelect) &&
                item.children.map((child) => (
                  <Select.Option key={child._id} value={child._id} type={child.type}>
                    {child.name}
                  </Select.Option>
                ))
              );
            })}
        </Select>
      </Form.Item>
      {selectType?.map((item, i) => checkType(item.type, i, ref))}
    </Form>
  );
});

export default ChangeInforForm;
