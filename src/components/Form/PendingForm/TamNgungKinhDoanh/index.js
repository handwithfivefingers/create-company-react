import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Space } from 'antd';
import clsx from 'clsx';
import React, { forwardRef, useState } from 'react';
import CCInput from 'src/components/CCInput';
import { SELECT } from 'src/contants/Common';
import styles from '../styles.module.scss';

const BASE_FORM = ['pending', 'approve'];

const TamNgungKinhDoanh = forwardRef((props, ref) => {
  const [objective, setObjective] = useState('');

  const handleChange = (val, opt) => {
    setObjective(val);
  };

  const handleDateChange = (date, dateString) => {
    ref.current.setFieldsValue({
      pending: {
        approve: {
          time_range: {
            start: dateString?.[0],
            end: dateString?.[1],
          },
        },
      },
    });
  };

  return (
    <Form.Item
      // label="Đăng ký tạm ngưng kinh doanh" Label này khách muốn ẩn đi
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* 

      <CCInput name={[...BASE_FORM, "company_name"]} label="Nhập tên doanh nghiệp (ghi bằng chữ IN HOA)" />

      <CCInput name={[...BASE_FORM, "mst"]} label="Mã số doanh nghiệp hoặc Mã số thuế" />

      <CCInput name={[...BASE_FORM, "time_provide"]} label="Ngày cấp" type="date" />

      <CCInput name={[...BASE_FORM, "place_provide"]} label="Nơi cấp" />

      <CCInput
        name={[...BASE_FORM, "opt_code"]}
        label="Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)"
      />

      <CCInput
        type="select"
        name={[...BASE_FORM, "obj"]}
        label="Chọn đối tượng thông báo tạm ngưng kinh doanh"
        onChange={handleChange}
        options={SELECT.BUSINESS_OBJECT}
      />

      {objective === "Toàn bộ công ty" ? (
        <>
          <CCInput
            name={[...BASE_FORM, "time_range"]}
            label="Thời gian đăng ký tạm ngưng (từ ngày/tháng/năm đến ngày/tháng/năm)"
            onChange={handleDateChange}
            type="date-range"
          />

          <CCInput name={[...BASE_FORM, "reason"]} label="Lý do tạm ngưng" />

          <CCInput name={[...BASE_FORM, "org_person"]} label="Tên người đại diện pháp luật/người đứng đầu chi nhánh" />
        </>
      ) : (
        <Row gutter={[12, 16]}>
          <ChiNhanh ref={ref} />
        </Row>
      )} */}

      <CCInput name={[...BASE_FORM, 'company_name']} label="Nhập tên doanh nghiệp (ghi bằng chữ IN HOA)" />

      <CCInput name={[...BASE_FORM, 'mst']} label="Mã số doanh nghiệp hoặc Mã số thuế" />

      <CCInput name={[...BASE_FORM, 'org_person']} label="Tên người đại diện pháp luật/người đứng đầu chi nhánh" />

      <CCInput
        type="select"
        name={[...BASE_FORM, 'obj']}
        label="Chọn đối tượng thông báo tạm ngưng kinh doanh"
        onChange={handleChange}
        options={SELECT.BUSINESS_OBJECT}
      />

      {objective === 'Toàn bộ công ty' ? (
        ''
      ) : (
        <Row gutter={[12, 16]}>
          <ChiNhanh ref={ref} />
        </Row>
      )}

      <Form.Item label="Thời gian đăng ký tạm ngừng kinh doanh (tối đa 12 tháng)">
        <Row gutter={[16, 12]}>
          <Col span={12}>
            <CCInput name={[...BASE_FORM, 'time_range', 'start']} label="Từ ngày" type="date" layout="horizontal" />
          </Col>
          <Col span={12}>
            <CCInput name={[...BASE_FORM, 'time_range', 'end']} label="Đến ngày" type="date" layout="horizontal" />
          </Col>
        </Row>
      </Form.Item>
      {/** <<<<- Group*/}
    </Form.Item>
  );
});

export default TamNgungKinhDoanh;

const ChiNhanh = forwardRef((props, ref) => {
  // const handleDateChange = (date, dateString, index) => {
  //   let val = ref.current.getFieldsValue();
  //   let { branch } = val.pending.approve;
  //   console.log(val);
  //   // let newVal = branch.map((item, i) => {
  //   //   if (i == +index) {
  //   //     let obj = {
  //   //       ...item,
  //   //       time_range: {
  //   //         start: dateString?.[0],
  //   //         end: dateString?.[1],
  //   //       },
  //   //     };
  //   //     console.log(obj, item);
  //   //     return { ...obj };
  //   //   }
  //   //   return { ...item };
  //   // });
  //   let newVal;
  //   for (let br of branch) {
  //     newVal.push(br);
  //   }
  //   branch[index] = {
  //     time_range: {
  //       start: dateString?.[0],
  //       end: dateString?.[1],
  //     },
  //   };

  //   ref.current.setFieldsValue({
  //     pending: {
  //       approve: {
  //         ...val.pending.approve,
  //         branch: [...branch],
  //       },
  //     },
  //   });
  // };

  return (
    <>
      <Form.List
        name={[...BASE_FORM, 'branch']}
        initialValue={[
          {
            branch_name: '',
            resp_office: '',
            branch_name_opt: '',
            branch_mst_opt: '',
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields?.map((field, i) => (
              <>
                <Col lg={12} md={12} sm={24} xs={24} key={[field, i + 1]}>
                  <CCInput
                    name={[field.name, 'branch_name']}
                    label="Nhập tên (của Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh, ghi bằng chữ IN HOA)"
                  />
                  <CCInput
                    name={[field.name, 'resp_office']}
                    label="Nhập Mã số (của Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh)"
                  />

                  {/** Group ->>>> */}
                  {/* 
                  <Form.Item label="Vui lòng điền thông tin sau đây nếu Địa điểm kinh doanh của bạn trực thuộc chi nhánh">
                    <CCInput name={[field.name, 'branch_name_opt']} label="Tên chi nhánh (nếu có)" />
                    <CCInput
                      name={[field.name, 'branch_mst_opt']}
                      label="Mã số chi nhánh/Mã số thuế của chi nhánh  (nếu có)"
                    />

                    <CCInput
                      name={[field.name, 'time_range', 'start']}
                      label="Thời gian đăng ký tạm ngưng (từ ngày/tháng/năm"
                      type="date"
                    />
                    <CCInput
                      name={[field.name, 'time_range', 'end']}
                      label="Thời gian đăng ký tạm ngưng ( đến ngày/tháng/năm)"
                      type="date"
                    />
                    <CCInput name={[field.name, 'reason']} label="Lý do tạm ngưng" />

                    <CCInput
                      name={[field.name, 'org_person']}
                      label="Người đại diện pháp luật (nhập đầy đủ họ và tên)"
                    />
                  </Form.Item> */}

                  <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    {fields.length <= 1 ? '' : <MinusCircleOutlined onClick={() => remove(field.name)} />}
                  </Space>
                </Col>
              </>
            ))}

            {fields.length >= 5 ? (
              ''
            ) : (
              <Form.Item label="">
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm chi nhánh
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>
    </>
  );
});
