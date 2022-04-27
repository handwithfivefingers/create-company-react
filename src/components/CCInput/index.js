import React from "react";
import { Form, Input, InputNumber, DatePicker, Select } from "antd";

export default function CCInput(props) {
  const { name, label } = props;

  switch (props.type) {
    case "text":
      return (
        <Form.Item value={props?.value} name={props.name} label={props?.label || " "}>
          <Input onChange={props?.onChange} style={props.style} placeholder={props?.placeholder} />
        </Form.Item>
      );
    case "number":
      return (
        <Form.Item value={props?.value} name={props.name} label={props?.label || " "}>
          <InputNumber
            onChange={props?.onChange}
            style={props.style}
            formatter={props?.formatter}
            placeholder={props?.placeholder}
          />
        </Form.Item>
      );
    case "date":
      return (
        <Form.Item name={props.name} label={props?.label || " "}>
          <DatePicker
            style={{ ...props.style, width: "100%" }}
            format="YYYY-MM-DD"
            placeholder={props?.placeholder}
          />
        </Form.Item>
      );
    case "select":
      return (
        <Form.Item name={props.name} label={props?.label || " "}>
          <Select onSelect={props?.onSelect}>
            {/* <Select.Option value={1}>Người đại diện là cá nhân</Select.Option> */}
            {/* <Select.Option value={2}>Người đại diện là tổ chức</Select.Option> */}
            {props?.options.map((item, i) => {
              return (
                <Select.Option value={item.value} key={[props?.name, i, item.value]}>
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      );
    default:
      return null;
  }
}
