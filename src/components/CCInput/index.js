import React, { forwardRef, useState } from "react";
import { Form, Input, InputNumber, DatePicker, Select, disabled } from "antd";
import { makeid } from "src/helper/Common";
const { RangePicker } = DatePicker;

const CCInput = forwardRef((props, ref) => {
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
        <Form.Item value={value} name={name} label={label || " "} key={props?.key}>
          <Input
            onChange={props?.onChange}
            style={style}
            placeholder={placeholder}
            disabled={props?.disabled}
            autoComplete="off"
          />
        </Form.Item>
      );
    case "number":
      return (
        <Form.Item value={props?.value} name={props.name} label={props?.label || " "} key={props?.key}>
          <InputNumber
            onChange={props?.onChange}
            style={props.style}
            formatter={props?.formatter}
            placeholder={props?.placeholder}
            {...rest}
            autoComplete="off"
          />
        </Form.Item>
      );
    case "date":
      return (
        <Form.Item name={props.name} label={props?.label || " "} key={props?.key}>
          <DatePicker
            style={{ ...props.style, width: "100%" }}
            format="DD/MM/YYYY"
            placeholder={props?.placeholder}
            autoComplete={props?.autocomplete || "off"}
            inputReadOnly={props?.inputReadOnly || true}
            onChange={props?.onChange}

            {...rest}
          />
        </Form.Item>
      );
    case "date-range":
      return (
        <>
          <Form.Item name={props?.name} style={{ display: "none" }} key={props?.key}>
            <RangePicker inputReadOnly format="MM/DD/YYYY" />
          </Form.Item>

          <Form.Item name={makeid(9)} label={props?.label || " "} key={props?.key}>
            <RangePicker
              inputReadOnly={props?.inputReadOnly || true}
              onChange={props?.onChange}
              format="MM/DD/YYYY"
              style={{ ...props.style, width: "100%" }}
              placeholder={placeholder}
              autoComplete={props?.autocomplete || "off"}
              {...rest}
            />
          </Form.Item>
        </>
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
            defaultValue={props?.defaultValue || null}
            defaultActiveFirstOption={props?.defaultActiveFirstOption}
            onDropdownVisibleChange={handleOptions}
            autoComplete="off"
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
      return (
        <Form.Item value={value} name={name} label={label || " "} key={props?.key}>
          <Input
            onChange={props?.onChange}
            style={style}
            placeholder={placeholder}
            disabled={props?.disabled}
            autoComplete={props?.autocomplete || "off"}
          />
        </Form.Item>
      );
  }
});

export default CCInput;
