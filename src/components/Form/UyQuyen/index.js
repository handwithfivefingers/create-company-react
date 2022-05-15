import { forwardRef } from "react";
import { Form } from "antd";
import CCInput from "../../CCInput";
import clsx from "clsx";
import styles from "./styles.module.scss";
const UyQuyen = forwardRef((props, ref) => {
  console.log(props);
  return (
    <Form
      ref={ref}
      layout="vertical"
      initialValues={{
        national: "vn",
      }}
      className={clsx([
        styles.current,
        {
          [styles.active]: props.current ? true : false,
        },
      ])}
    >
      <CCInput type="text" name={["uy_quyen", "approve", "name"]} label={"Họ và tên"} />
      <CCInput type="text" name={["uy_quyen", "approve", "birth_day"]} label={"Ngày tháng năm sinh"} />
      <CCInput type="text" name={["uy_quyen", "approve", "per_type"]} label={"Dân tộc"} />
      <CCInput type="text" name={["uy_quyen", "approve", "national"]} label={"Quốc tịch"} />
      <CCInput type="text" name={["uy_quyen", "approve", "doc_code"]} label={"CMND/CCCD/Hộ chiếu số"} />
      <CCInput type="date" name={["uy_quyen", "approve", "doc_time_provide"]} label={"Cấp ngày"} />
      <CCInput type="text" name={["uy_quyen", "approve", "doc_place_provide"]} label={"Nơi cấp"} />
      <CCInput type="text" name={["uy_quyen", "approve", "reg_address"]} label={"Nơi đăng ký hộ khẩu thường trú"} />
    </Form>
  );
});
export default UyQuyen;
