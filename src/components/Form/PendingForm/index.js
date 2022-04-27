import React, { forwardRef, useState } from "react";
import { Card, Form, Select } from "antd";
import clsx from "clsx";
import styles from "./styles.module.scss";
import TamNgungKinhDoanh from "./TamNgungKinhDoanh";
import KinhDoanhLaiTruocThoiHan from "./KinhDoanhLaiTruocThoiHan";
const TamHoanForm = forwardRef((props, ref) => {
  const [productSelect, setProductSelect] = useState("");

  const [selectType, setSelectType] = useState();

  const renderFormByType = (type) => {
    let xhtml = null;
    if (type === "1") {
      xhtml = <TamNgungKinhDoanh current={props.current} index={1} />;
    }
    if (type === "2") xhtml = <KinhDoanhLaiTruocThoiHan current={props.current} index={1} />;

    return xhtml;
  };
  const handleOnChange = (val, opt) => {
    console.log("change ???");
    setSelectType(opt);
    if (props.onFinishScreen) {
      props.onFinishScreen(opt);
    }
  };

  return (
    <Form ref={ref} layout="vertical">
      <Form.Item
        name="selectProduct"
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
        name="selectChildProduct"
        label="Chọn thông tin thay đổi"
        required
        className={clsx(styles.current, {
          [styles.active]: props.current === 0,
        })}
      >
        <Select allowClear style={{ width: "100%" }} placeholder="Please select" onChange={handleOnChange}>
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
      {selectType?.type && renderFormByType(selectType?.type)}
    </Form>
  );
});

export default TamHoanForm;
