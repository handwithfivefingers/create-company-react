import React, { useState } from "react";
import { Form, Input, InputNumber, DatePicker, Select, disabled } from "antd";

const { RangePicker } = DatePicker;

export default function CCInput(props) {
  const { name, label, value, onChange, style, placeholder, defaultValue, ...rest } = props;
  const [optional, setOptional] = useState([]);
  const handleOptions = () => {
    let option;
    if (typeof props?.options !== "object") {
      // function
      option = props?.options();
    } else {
      option = props?.options;
    }
    setOptional(option);
  };
  switch (props.type) {
    case "text":
      return (
        <Form.Item value={value} name={name} label={label || " "}>
          <Input
            onChange={onChange}
            style={style}
            placeholder={placeholder}
            disabled={props?.disabled}
            autocomplete="off"
          />
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
            {...rest}
            autocomplete="off"
          />
        </Form.Item>
      );
    case "date":
      return (
        <Form.Item name={props.name} label={props?.label || " "}>
          <DatePicker
            style={{ ...props.style, width: "100%" }}
            format="DD/MM/YYYY"
            placeholder={props?.placeholder}
            autocomplete="off"
            inputReadOnly
            {...rest}
          />
        </Form.Item>
      );
    case "date-range":
      return (
        <Form.Item name={props.name} label={props?.label || " "}>
          <RangePicker
            style={{ ...props.style, width: "100%" }}
            format="DD/MM/YYYY"
            placeholder={props?.placeholder}
            autocomplete="off"
            inputReadOnly
            {...rest}
          />
        </Form.Item>
      );
    case "select":
      let option;
      if (props?.onDropdownVisibleChange) {
        option = props.options();
      }

      return (
        <Form.Item name={name} label={label || " "}>
          <Select
            onSelect={props?.onSelect}
            onChange={props?.onChange}
            disabled={props?.disabled}
            defaultValue={defaultValue}
            defaultActiveFirstOption={props?.defaultActiveFirstOption}
            onDropdownVisibleChange={handleOptions}
            autocomplete="off"
            style={props?.style}
          >
            {optional?.map((item, i) => {
              return (
                <Select.Option value={item.value} key={item.key ? item.key : [name, i, item.value]}>
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
