import React from "react";
import { Form, Input, InputNumber, DatePicker } from "antd";

export default function CCInput(props) {
  const { name, label } = props;
  switch (props.type) {
    case "text":
      return (
        <Form.Item value={props?.value} name={props.name} label={props?.label || ' '}>
          <Input onChange={props?.onChange} style={props.style} placeholder={props?.placeholder}/>
        </Form.Item>
      );
    case "number":
      return (
        <Form.Item value={props?.value} name={props.name} label={props?.label || ' '}>
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
        <Form.Item name={props.name} label={props?.label || ' '}>
          <DatePicker style={props.style} placeholder={props?.placeholder} />
        </Form.Item>
      );
    default:
      return null;
  }
}
