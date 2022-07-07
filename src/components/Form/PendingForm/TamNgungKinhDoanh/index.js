import React, { forwardRef, useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Space } from 'antd';
import { SELECT } from 'src/contants/Common';
import { PENDING_FORM } from 'src/contants/FormConstant';
import CCInput from 'src/components/CCInput';
import clsx from 'clsx';
import styles from '../styles.module.scss';
import CCListForm from 'src/components/CCListForm';

const BASE_FORM = ['pending', 'approve'];

const TamNgungKinhDoanh = forwardRef((props, ref) => {
  const [objective, setObjective] = useState('');
  // const { type } = props?.data;
  const [type, setType] = useState();
  const handleChange = (e, pathname) => {
    ref.current.setFields([
      {
        name: [...BASE_FORM, pathname],
        value: e.target.value.toUpperCase(),
      },
    ]);
  };

  useEffect(() => {
    if (props.data) {
      setType(props.data.type);
    }
  }, [props]);

  const renderFormByType = () => {
    let xhtml = null;

    if (type === '3') {
      let listForm = [
        {
          label: PENDING_FORM.approve.fields.list_president.president,
          name: 'president',
          options: {
            toUpperCase: true,
          },
        },
      ];
      // BASE_FORM, listForm, listName, addBtn, formLength;

      xhtml = (
        <>
          <CCInput label={PENDING_FORM.approve.fields.location} name={[...BASE_FORM, 'location']} />
          <CCInput label={PENDING_FORM.approve.fields.main_legal} name={[...BASE_FORM, 'main_legal']} />

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
        </>
      );
    } else if (type === '2') {
      let listForm = [
        {
          label: PENDING_FORM.approve.fields.contribute_members.name,
          name: 'name',
          options: {
            toUpperCase: true,
          },
        },
        {
          label: PENDING_FORM.approve.fields.contribute_members.capital,
          name: 'capital',
        },
        {
          label: PENDING_FORM.approve.fields.contribute_members.capital_percent,
          name: 'capital_percent',
        },
      ];
      // BASE_FORM, listForm, listName, addBtn, formLength;

      xhtml = (
        <>
          <CCInput label={PENDING_FORM.approve.fields.location} name={[...BASE_FORM, 'location']} />
          <CCInput label={PENDING_FORM.approve.fields.main_legal} name={[...BASE_FORM, 'main_legal']} />

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
        onChange={(e) => handleChange(e, 'company_name')}
      />

      <CCInput name={[...BASE_FORM, 'mst']} label="Mã số doanh nghiệp hoặc Mã số thuế" placeholder="0316184427" />

      <CCInput name={[...BASE_FORM, 'org_person']} label="Tên người đại diện pháp luật" placeholder="Nguyễn Văn A" />

      {type && renderFormByType()}

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
            onChange={(e) => handleChange(e, 'branch_name')}
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

// const ChiNhanh = forwardRef((props, ref) => {
//   // const handleDateChange = (date, dateString, index) => {
//   //   let val = ref.current.getFieldsValue();
//   //   let { branch } = val.pending.approve;
//   //   console.log(val);
//   //   // let newVal = branch.map((item, i) => {
//   //   //   if (i == +index) {
//   //   //     let obj = {
//   //   //       ...item,
//   //   //       time_range: {
//   //   //         start: dateString?.[0],
//   //   //         end: dateString?.[1],
//   //   //       },
//   //   //     };
//   //   //     console.log(obj, item);
//   //   //     return { ...obj };
//   //   //   }
//   //   //   return { ...item };
//   //   // });
//   //   let newVal;
//   //   for (let br of branch) {
//   //     newVal.push(br);
//   //   }
//   //   branch[index] = {
//   //     time_range: {
//   //       start: dateString?.[0],
//   //       end: dateString?.[1],
//   //     },
//   //   };

//   //   ref.current.setFieldsValue({
//   //     pending: {
//   //       approve: {
//   //         ...val.pending.approve,
//   //         branch: [...branch],
//   //       },
//   //     },
//   //   });
//   // };

//   return (
//     <>
//       <Form.List
//         name={[...BASE_FORM, 'branch']}
//         initialValue={[
//           {
//             branch_name: '',
//             resp_office: '',
//             branch_name_opt: '',
//             branch_mst_opt: '',
//           },
//         ]}
//       >
//         {(fields, { add, remove }) => (
//           <>
//             {fields?.map((field, i) => (
//               <>
//                 <Col lg={12} md={12} sm={24} xs={24} key={[field, i + 1]}>
//                   <CCInput
//                     name={[field.name, 'branch_name']}
//                     label={
//                       <>
//                         Nhập tên&nbsp;<i> (của Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh)</i>
//                       </>
//                     }
//                     placeholder="CHI NHÁNH CÔNG TY TNHH DỊCH VỤ TƯ VẤN WARREN B"
//                   />
//                   <CCInput
//                     name={[field.name, 'resp_office']}
//                     label={
//                       <>
//                         Nhập Mã số&nbsp;<i> (của Chi nhánh hoặc Văn phòng đại diện hoặc Địa điểm kinh doanh)</i>
//                       </>
//                     }
//                     placeholder="0316184427 - 001"
//                   />
//                   <Space style={{ display: 'flex', justifyContent: 'center' }}>
//                     {fields.length <= 1 ? '' : <MinusCircleOutlined onClick={() => remove(field.name)} />}
//                   </Space>
//                 </Col>
//               </>
//             ))}

//             {fields.length >= 5 ? (
//               ''
//             ) : (
//               <Form.Item label="">
//                 <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                   Thêm chi nhánh
//                 </Button>
//               </Form.Item>
//             )}
//           </>
//         )}
//       </Form.List>
//     </>
//   );
// });

// const CCListForm = forwardRef((props, ref) => {
//   return (
//     <Row gutter={[16, 12]}>
//       <Form.List name={[...BASE_FORM, 'list_president']}>
//         {(fields, { add, remove }) => (
//           <>
//             {fields?.map((field, i) => (
//               <>
//                 <Col lg={12} md={12} sm={24} xs={24} key={[field, i + 1]}>
//                   <CCInput label={PENDING_FORM.approve.fields.president} name={[field.name, 'president']} />
//                   <CCInput label={PENDING_FORM.approve.fields.president_2} name={[field.name, 'president_2']} />
//                   <CCInput label={PENDING_FORM.approve.fields.president_3} name={[field.name, 'president_3']} />

//                   <Space style={{ display: 'flex', justifyContent: 'center' }}>
//                     {fields.length <= 1 ? '' : <MinusCircleOutlined onClick={() => remove(field.name)} />}
//                   </Space>
//                 </Col>
//               </>
//             ))}

//             {fields.length >= 5 ? (
//               ''
//             ) : (
//               <Form.Item label="">
//                 <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
//                   Thêm thành viên HĐQT (nếu có)
//                 </Button>
//               </Form.Item>
//             )}
//           </>
//         )}
//       </Form.List>
//     </Row>
//   );
// });
