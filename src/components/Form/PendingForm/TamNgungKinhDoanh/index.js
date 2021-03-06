import React, { forwardRef, useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Space, InputNumber } from 'antd';
import { SELECT } from 'src/contants/Common';
import { PENDING_FORM } from 'src/contants/FormConstant';
import CCInput from 'src/components/CCInput';
import clsx from 'clsx';
import styles from '../styles.module.scss';
import CCListForm from 'src/components/CCListForm';

const BASE_FORM = ['pending', 'approve'];

const TamNgungKinhDoanh = forwardRef((props, ref) => {
  const [objective, setObjective] = useState('');

  const handleChange = (e, pathname) => {
    ref.current.setFields([
      {
        name: Array.isArray(pathname) ? [...pathname] : [pathname],
        value: e.target.value.toUpperCase(),
      },
    ]);
  };

  const renderFormByType = (type) => {
    let xhtml = null;

    if (type === '3') {
      let listForm = [
        {
          label: 'Tên Chủ tịch HĐQT',
          placeholder: 'NGUYỄN VĂN A',
          name: 'president',
          onChange: true,
          options: {
            toUpperCase: true,
            compare: {
              end: 5,
              index: 2,
            },
            customLabel: 'Nhập tên thành viên HĐQT ',
          },
        },
      ];
      // BASE_FORM, listForm, listName, addBtn, formLength;

      xhtml = (
        <>
          <CCInput
            label={PENDING_FORM.approve.fields.location}
            name={[...BASE_FORM, 'location']}
            placeholder="Địa chỉ trụ sở chính"
          />

          <CCListForm
            label="Hội đồng quản trị"
            BASE_FORM={BASE_FORM}
            listForm={listForm}
            formLength={5}
            defaultLength={3}
            btnText="Thêm thành viên HĐQT (nếu có)"
            listName="list_president"
            ref={ref}
          />
          <Form.Item label="Tổng số vốn điều lệ" name={[...BASE_FORM, 'total_capital']}>
            <InputNumber
              placeholder="100,000,000"
              // stringMode
              formatter={(v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </>
      );
    } else if (type === '2') {
      let listForm = [
        {
          label: PENDING_FORM.approve.fields.contribute_members.name,
          placeholder: 'NGUYỄN VĂN A',
          name: 'name',
          onChange: true,
          options: {
            toUpperCase: true,
            compare: {
              end: 5,
              index: 2,
            },
            customLabel: 'Nhập tên thành viên góp vốn thứ ',
          },
        },
        {
          label: PENDING_FORM.approve.fields.contribute_members.capital,
          placeholder: '80,000,000',
          name: 'capital',
          options: {
            column: 12,
            layout: 'horizontal',
            format: true,
            formatter: (v) => `${new Intl.NumberFormat('en-US').format(v.replace(/,/g, ''))}`,
          },
        },
        {
          label: PENDING_FORM.approve.fields.contribute_members.capital_percent,
          placeholder: '80',
          name: 'capital_percent',
          options: {
            column: 12,
            layout: 'horizontal',
            format: true,
            formatter: (v) => `${v.replace('%', '')}%`,
            max: 100,
            min: 0,
            length: 3,
          },
        },
      ];
      // BASE_FORM, listForm, listName, addBtn, formLength;

      xhtml = (
        <>
          <CCInput
            label={PENDING_FORM.approve.fields.location}
            name={[...BASE_FORM, 'location']}
            placeholder="Địa chỉ trụ sở chính"
          />

          <CCListForm
            label="Hội đồng thành viên"
            BASE_FORM={BASE_FORM}
            listForm={listForm}
            formLength={5}
            defaultLength={2}
            btnText="Thêm thành viên góp vốn (nếu có)"
            listName="contribute_members"
            ref={ref}
          />
        </>
      );
    }
    return xhtml;
  };

  return (
    <Form.Item
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <CCInput
        name={[...BASE_FORM, 'company_name']}
        label="Nhập tên doanh nghiệp"
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        onChange={(e) => handleChange(e, [...BASE_FORM, 'company_name'])}
      />

      <CCInput name={[...BASE_FORM, 'mst']} label="Mã số doanh nghiệp hoặc Mã số thuế" placeholder="0316184427" />

      <CCInput
        name={[...BASE_FORM, 'org_person']}
        label={
          <div dangerouslySetInnerHTML={{ __html: '</>Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i></>' }} />
        }
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => handleChange(e, [...BASE_FORM, 'org_person'])}
      />

      {renderFormByType(props?.data?.type)}

      <CCInput
        type="select"
        name={[...BASE_FORM, 'obj']}
        label="Chọn đối tượng thông báo tạm ngưng kinh doanh"
        onChange={(val, opt) => setObjective(val)}
        options={SELECT.BUSINESS_OBJECT}
        placeholder="Bấm vào đây"
      />

      {objective === 'Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh' && (
        <>
          <CCInput
            name={[...BASE_FORM, 'branch_name']}
            label={
              <>
                Nhập tên&nbsp;<i> (của Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh)</i>
              </>
            }
            placeholder="CHI NHÁNH CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
            onChange={(e) => handleChange(e, [...BASE_FORM, 'branch_name'])}
          />
          <CCInput
            name={[...BASE_FORM, 'resp_office']}
            label={
              <>
                Nhập Mã số&nbsp;<i> (của Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh)</i>
              </>
            }
            placeholder="0316184427 - 001"
          />
        </>
      )}

      <Form.Item
        label={
          <>
            Thời gian đăng ký tạm ngừng kinh doanh&nbsp;
            <i> (tối đa 12 tháng, ngày bắt đầu tạm ngừng sau ít nhất 3 ngày làm việc kể từ ngày nộp hồ sơ)</i>
          </>
        }
      >
        <Row gutter={[16, 12]}>
          <Col span={12}>
            <CCInput
              name={[...BASE_FORM, 'time_range', 'start']}
              label="Từ ngày"
              type="date"
              layout="horizontal"
              placeholder="Chọn ngày"
            />
          </Col>
          <Col span={12}>
            <CCInput
              name={[...BASE_FORM, 'time_range', 'end']}
              label="Đến ngày"
              type="date"
              layout="horizontal"
              placeholder="Chọn ngày"
            />
          </Col>
        </Row>
      </Form.Item>
    </Form.Item>
  );
});

export default TamNgungKinhDoanh;
