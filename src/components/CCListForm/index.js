import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Space } from 'antd';
import CCInput from 'src/components/CCInput';

const CCListForm = forwardRef((props, ref) => {
  const { BASE_FORM, listForm, listName, btnText, formLength, defaultLength } = props;
  // const [obj, setObj] = useState([{}, {}, {}, {}, {}]);
  let obj = [{}, {}, {}, {}, {}]; // defaultObj
  const handleChange = (e, formItem, i) => {
    let val = e.target.value;
    if (formItem?.options?.toUpperCase) {
      val = val.toUpperCase();
    }
    ref.current.setFields([
      {
        name: [...BASE_FORM, listName, i, formItem?.name],
        value: val,
      },
    ]);
  };

  return (
    <Form.Item label={<h4>{props?.label}</h4>}>
      <Row gutter={[16, 12]}>
        <Form.List name={[...BASE_FORM, listName]} initialValue={obj.slice(0, defaultLength || 1)}>
          {(fields, { add, remove }) => (
            <>
              {fields?.map((field, i) => (
                <>
                  <Col lg={12} md={12} sm={24} xs={24} key={[field, i + 1]}>
                    {listForm.map((formItem, index) => {
                      return (
                        <CCInput
                          key={[field.name, index, formItem?.name]}
                          label={formItem?.label}
                          name={[field.name, formItem?.name]}
                          type={formItem?.type}
                          onChange={(e) => handleChange(e, formItem, i)}
                        />
                      );
                    })}

                    <Space style={{ display: 'flex', justifyContent: 'center' }}>
                      {fields.length <= (defaultLength || 1) ? (
                        ''
                      ) : (
                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                      )}
                    </Space>
                  </Col>
                </>
              ))}

              {fields.length >= formLength ? (
                ''
              ) : (
                <Form.Item label=" ">
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    {btnText}
                  </Button>
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </Row>
    </Form.Item>
  );
});

export default CCListForm;
