import React, { forwardRef, useEffect, useState, useRef } from "react";
import { Card, Form, Select, Slider } from "antd";
import ProductForm from "../ProductForm";
import DaiDienPhapLuat from "./DaiDienPhapLuat";
import TenDoanhNghiep from "./TenDoanhNghiep";
import TangVonDieuLe from "./TangVonDieuLe";
import GiamVonDieuLe from "./GiamVonDieuLe";
import NganhNgheKinhDoanh from "./NganhNgheKinhDoanh";
import DiaChiTruSoChinh from "./DiaChiTruSoChinh";
import HopDongChuyenNhuong from "./HopDongChuyenNhuong";
import DaiDienToChuc from "./DaiDienToChuc";
import ThongTinDangKyThue from "./ThongTinDangKyThue";
import clsx from "clsx";
import styles from "./DaiDienPhapLuat/styles.module.scss";
/**
 *
 * @returns Form Thay Doi Thong Tin  -> JSX
 *
 */
const ChangeInforForm = forwardRef((props, ref) => {
  const [productSelect, setProductSelect] = useState("");
  const [selectType, setSelectType] = useState([]);

  const checkType = (type, i, ref) => {
    switch (type) {
      case "2":
        return <DaiDienPhapLuat current={props.current} index={i + 1} ref={ref} />;
      case "3":
        return <TenDoanhNghiep current={props.current} index={i + 1} ref={ref} />;
      case "4":
        return <GiamVonDieuLe current={props.current} index={i + 1} ref={ref} />;
      case "5":
        return <TangVonDieuLe current={props.current} index={i + 1} ref={ref} />;
      case "7":
        return <NganhNgheKinhDoanh current={props.current} index={i + 1} ref={ref} />;
      case "1":
        return <DiaChiTruSoChinh current={props.current} index={i + 1} ref={ref} />;
      case "6":
        return <HopDongChuyenNhuong current={props.current} index={i + 1} ref={ref} />;
      case "8":
        return <DaiDienToChuc current={props.current} index={i + 1} ref={ref} />;
      case "9":
        return <ThongTinDangKyThue current={props.current} index={i + 1} ref={ref} />;
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
  // console.log("selectType", selectType, props.current);

  return (
    // <Card style={{ minWidth: "350px" }} title="Chọn loại hình doanh nghiệp">    {/* </Card> */}
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
