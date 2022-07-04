import React, { forwardRef, useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Space } from 'antd';
import CCInput from 'src/components/CCInput';

const CCListForm = forwardRef((props, ref) => {
  const { BASE_FORM, listForm, listName, btnText, formLength } = props;
  console.log(props);
  return (
    <Row gutter={[16, 12]}>
      <Form.List name={[...BASE_FORM, listName]}>
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
                      />
                    );
                  })}

                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    {fields.length <= 1 ? '' : <MinusCircleOutlined onClick={() => remove(field.name)} />}
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
  );
});

export default CCListForm;
