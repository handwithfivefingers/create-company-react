import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Space } from 'antd';
import CCInput from 'src/components/CCInput';

const CCListForm = forwardRef((props, ref) => {
  const { BASE_FORM, listForm, listName, btnText, formLength, defaultLength } = props;

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

  const handleRenderLabel = (formItem, i) => {
    // console.log(formItem, i);
    let index = formItem.options?.compare?.index;
    if (index && index <= i + 1) {
      return formItem?.options?.customLabel + (i + 1);
    }
    return formItem?.label;
  };

  const renderListform = (listForm, field, i) => {
    let xhtml = null;

    xhtml = listForm.map((formItem, index) => {
      let column = formItem.options.column;
      // console.log(listForm, formItem);
      return (
        <Col span={column || 24}>
          <CCInput
            key={[field.name, index, formItem?.name]}
            label={handleRenderLabel(formItem, i)}
            name={[field.name, formItem?.name]}
            type={formItem?.type}
            onChange={(e) => handleChange(e, formItem, i)}
            layout={formItem?.options?.layout}
            placeholder={formItem?.placeholder}
          />
        </Col>
      );
    });

    return xhtml;
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
                    <Row gutter={[16, 12]}>{renderListform(listForm, field, i)}</Row>

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
