import { Form, InputNumber } from 'antd';
import clsx from 'clsx';
import React, { forwardRef, useEffect, useState } from 'react';
import CCInput from 'src/components/CCInput';
import styles from '../styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { DISSOLUTION_FORM } from 'src/contants/FormConstant';
import CCListForm from 'src/components/CCListForm';
const BASE_FORM = ['dissolution', 'approve'];
const GiaiThe = forwardRef((props, ref) => {
  const [type, setType] = useState('1');
  let navigate = useNavigate();
  useEffect(() => {
    let { selectProduct } = ref.current.getFieldsValue();
    if (selectProduct?.type) {
      setType(selectProduct?.type);
    }
  }, [props]);

  const setFields = (e, pathname) => {
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
          label: DISSOLUTION_FORM.approve.fields.contribute_members.name,
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
          label: DISSOLUTION_FORM.approve.fields.contribute_members.capital,
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
          label: DISSOLUTION_FORM.approve.fields.contribute_members.capital_percent,
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
      // label="Giải thể"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      <CCInput
        label="Nhập tên doanh nghiệp"
        name={[...BASE_FORM, 'company_name']}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
        onChange={(e) => setFields(e, [...BASE_FORM, 'company_name'])}
      />

      <CCInput label="Nhập mã số doanh nghiệp hoặc Mã số thuế" name={[...BASE_FORM, 'mst']} placeholder="0316184427" />

      <CCInput
        label={
          <div dangerouslySetInnerHTML={{ __html: '</>Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i></>' }} />
        }
        name={[...BASE_FORM, 'org_person']}
        placeholder="NGUYỄN VĂN A"
        onChange={(e) => setFields(e, [...BASE_FORM, 'org_person'])}
      />

      <CCInput label="Địa chỉ trụ sở chính" name={[...BASE_FORM, 'location']} placeholder="Nhập địa chỉ trụ sở chính" />

      {renderFormByType(type)}
    </Form.Item>
  );
});

export default GiaiThe;
