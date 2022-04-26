import { Button, Card, message, Modal, Tabs } from "antd";
import Aos from "aos";
import React, { useEffect, useRef, useState } from "react";
import CCSteps from "src/components/CCHeaderSteps";
import ChangeInforForm from "src/components/Form/ChangeInforForm";
import CreateCompany from "src/components/Form/CreateCompany";
import PreviewData from "src/components/Form/PreviewData";
import axios from "src/config/axios";
import { stepType1 } from "src/contants/Step";
import { useParams } from "react-router-dom";
// import { NextResponse } from 'next/server';
const { TabPane } = Tabs;
const UserProductItem = (props) => {
  const productRef = useRef();
  const registerRef = useRef();
  const formRef = useRef();
  const loginRef = useRef();
  const inforRef = useRef();
  const [form, setForm] = useState({});
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState();
  const [changeInforStep, setChangeInforStep] = useState([
    {
      title: "Bước 1",
      desc: "Chọn loại hình",
    },
    {
      title: `Bước 2`,
      desc: "Preview",
    },
  ]);
  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  });
  let params = useParams();
  useEffect(() => {
    // console.log(slug);
    getDataBySlug();
    Aos.init({ duration: 300 });
  }, []);
  const getDataBySlug = () => {
    axios.get(`/product/${params.slug}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };
  // useEffect(() => {
  //   if (status === "authenticated") {
  //     setCurrent(0);
  //   }
  // }, [status]);

  const Next = () => {
    // case here
    let val = formRef.current?.getFieldsValue();
    setForm({
      ...form,
      ...val,
    });
    setCurrent(current + 1);
  };

  const Prev = () => {
    setCurrent(current - 1);
  };

  // handle all data here
  const setDataOutput = (output) => {
    console.log(output);
  };

  const renderPrewviewForm = (ref) => {
    let val = ref?.current.getFieldsValue();
    console.log(val);
    return (
      <PreviewData
        data={val}
        onFinishScreen={() => {
          closeModal();
        }}
      />
    );
  };

  const closeModal = () => {
    setChildModal({
      ...childModal,
      visible: false,
    });
  };

  const handlePurchase = (type) => {
    let val = formRef.current.getFieldsValue();
    let params = {
      price: 999999,
      track: {
        step: 1,
        status: "progress",
      },
      payment: 0,

      data: {},
    };
    if (type === "change") {
      let newForm = {
        ...form,
        productId: form.selectProduct,
      };
      params.data = {
        change_info: {
          ...newForm,
        },
      };
      params.products = val?.selectChildProduct;
    }
    if (type === "register") {
      let newForm = {
        ...form,
        productId: form.selectProduct,
      };
      params.data = {
        create_company: {
          ...newForm,
        },
      };
      params.products = form.selectProduct;
    }

    // console.log(params);
    console.log(params);
    axios
      .post("/order/create", params)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          message.success(res.data.message);
          // router.push({
          //   pathname: "/order/[...slug]",
          //   query: {
          //     slug: res.data.data.orderId,
          //   },
          // });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChangeInforForm = (val) => {
    let data = [
      {
        title: "Bước 1",
        desc: "Chọn loại hình",
      },
    ];
    let current = null;

    for (let i = 0; i < val.length; i++) {
      data.push({ desc: val[i].children, title: `Bước ${i + 2}` });
      current = i;
    }

    data.push({
      title: `Bước ${val.length > 0 ? val.length + 2 : data.length + 1}`,
      desc: "Preview",
    });

    setChangeInforStep(data);
  };

  const renderFormByType = (type) => {
    switch (type) {
      case 1: // create Company
        return (
          <>
            <Card className="card-boxShadow">
              <CreateCompany
                data={data.data}
                ref={formRef}
                onFinishScreen={(output) => setDataOutput(output)}
                step={current}
                setStep={(e) => setCurrent(e)}
              />

              {current === 8 ? renderPrewviewForm(formRef) : ""}

              <div className={"card-boxShadow"} style={{ position: "sticky", bottom: 0 }}>
                {current < 8 ? <Button onClick={Next}>Next</Button> : ""}

                {current === 8 ? (
                  <>
                    {/* <Button onClick={handlePreview}>Kiểm tra</Button> */}
                    <Button onClick={() => handlePurchase("register")}>Thanh toán</Button>
                  </>
                ) : (
                  ""
                )}

                {current > 0 ? <Button onClick={Prev}>Prev</Button> : ""}
              </div>
            </Card>
          </>
        );
      case 2:
        return (
          <Card className="card-boxShadow">
            <ChangeInforForm
              data={data.data}
              ref={formRef}
              current={current}
              onFinishScreen={(val) => handleChangeInforForm(val)}
            />

            {current === changeInforStep?.length ? renderPrewviewForm() : ""}

            <div className={"card-boxShadow"} style={{ position: "sticky", bottom: 0 }}>
              {current < changeInforStep.length - 1 ? <Button onClick={Next}>Next</Button> : ""}

              {current === changeInforStep.length - 1 ? (
                <>
                  <Button onClick={() => handlePurchase("change")}>Thanh toán</Button>
                </>
              ) : (
                ""
              )}
              {current > 0 ? <Button onClick={Prev}>Prev</Button> : ""}
            </div>
          </Card>
        );
      case 3:
        return;
      case 4:
        return;
      default:
        return null;
    }
  };

  const renderHeaderStep = (type) => {
    switch (type) {
      case 1:
        return <CCSteps step={current} data={stepType1} />;

      case 2:
        return <CCSteps step={current} data={changeInforStep} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="" style={{ paddingBottom: 50 }}>
        {data && renderHeaderStep(data?.type)}

        {data && renderFormByType(data?.type)}

        <Modal
          visible={childModal.visible}
          width={childModal.width}
          footer={null}
          bodyStyle={{
            background: "#eee",
          }}
          onCancel={closeModal}
        >
          {childModal.component}
        </Modal>
      </div>
    </>
  );
};

export default UserProductItem;

// export const getServerSideProps = async (context) => {
//   let slug = context.params.slug;
//   let res = await axios.get(`${process.env.NEXTAUTH_URL}/api/product/${slug}`);
//   return {
//     props: {
//       ...res.data,
//     },
//   };
// };
