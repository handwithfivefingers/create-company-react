import { Form } from 'antd';
import clsx from 'clsx';
import React, { forwardRef, useEffect, useState } from 'react';
import CCInput from 'src/components/CCInput';
import styles from '../styles.module.scss';
import { useNavigate } from 'react-router-dom';
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

  return (
    <Form.Item
      // label="Giải thể"
      className={clsx(styles.current, {
        [styles.active]: props.current === props.index,
      })}
    >
      {/* <CCInput name={['dissolution', 'approve', 'company_name']} label="Tên doanh nghiệp (ghi bằng chữ in hoa)" />

      <CCInput name={['dissolution', 'approve', 'mst']} label="Mã số doanh nghiệp/Mã số thuế" />

      <CCInput name={['dissolution', 'approve', 'time_provide']} label="Ngày cấp" type="date" />

      <CCInput name={['dissolution', 'approve', 'place_provide']} label="Nơi cấp" />
      <CCInput
        name={['dissolution', 'approve', 'opt_code']}
        label="Số Giấy chứng nhận đăng ký kinh doanh (chỉ kê khai nếu không có mã số doanh nghiệp/mã số thuế)"
      />

      <CCInput name={['dissolution', 'approve', 'company_address']} label="Địa chỉ trụ sở chính" />

      <CCInput name={['dissolution', 'approve', 'reason']} label="Lý do giải thể" />

      <CCInput name={['dissolution', 'approve', 'representative']} label="Ông (bà) Chủ sở hữu/đại diện chủ sở hữu" /> */}
      <CCInput
        label="Nhập tên doanh nghiệp"
        name={[...BASE_FORM, 'company_name']}
        placeholder="CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
      />

      <CCInput label="Nhập mã số doanh nghiệp hoặc Mã số thuế" name={[...BASE_FORM, 'mst']} placeholder="0316184427" />

      <CCInput
        label={
          <div dangerouslySetInnerHTML={{ __html: '</>Người đại diện pháp luật <i>(nhập đầy đủ họ và tên)</i></>' }} />
        }
        name={[...BASE_FORM, 'org_person']}
        placeholder="NGUYỄN VĂN A"
      />

      <CCInput label="Địa chỉ trụ sở chính" name={[...BASE_FORM, 'location']} placeholder="Nhập địa chỉ trụ sở chính" />
    </Form.Item>
  );
});

export default GiaiThe;
