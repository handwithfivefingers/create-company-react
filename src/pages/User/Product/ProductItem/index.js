import { Button, Card, message, Modal, Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";
import CCSteps from "src/components/CCHeaderSteps";
import ChangeInforForm from "src/components/Form/ChangeInforForm";
import CreateCompany from "src/components/Form/CreateCompany";
import PreviewData from "src/components/Form/PreviewData";
import axios from "src/config/axios";
import { stepType1 } from "src/contants/Step";
import { useParams } from "react-router-dom";
import TamHoanForm from "src/components/Form/PendingForm";
import styles from "./styles.module.scss";
import ProductService from "src/service/UserService/ProductService";
import Dissolution from "src/components/Form/Dissolution";
import dateformat from "dateformat";
const { TabPane } = Tabs;

const UserProductItem = (props) => {
  const formRef = useRef();
  let params = useParams();

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

  const [pendingStep, setPendingStep] = useState([
    {
      title: "Bước 1",
      desc: "Chọn loại hình",
    },
    {
      title: `Bước 2`,
      desc: "Preview",
    },
  ]);

  const [dissolutionStep, setDissolutionStep] = useState([
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

  useEffect(() => {
    getDataBySlug();
  }, []);

  const getDataBySlug = () => {
    axios.get(`/product/${params.slug}`).then((res) => {
      setData(res.data);
    });
  };

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

  const renderFormByType = (type) => {
    switch (type) {
      case 1:
        // Thành lập doanh nghiệp
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
                    <Button onClick={handleSave}>Lưu lại</Button>
                    <Button onClick={handlePurchaseCreateCompany}>Thanh toán</Button>
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
        // Thay đổi thông tin
        return (
          <Card className="card-boxShadow">
            <ChangeInforForm
              data={data.data}
              ref={formRef}
              current={current}
              onFinishScreen={(val) => handleChangeInforForm(val)}
            />

            {current === changeInforStep?.length - 1 ? renderPrewviewForm(formRef) : ""}

            <div className={"card-boxShadow"} style={{ position: "sticky", bottom: 0 }}>
              {current < changeInforStep.length - 1 ? <Button onClick={Next}>Next</Button> : ""}

              {current === changeInforStep.length - 1 ? (
                <>
                  <Button onClick={handleSaveChangeInfo}>Lưu lại</Button>
                  <Button onClick={() => handlePurchaseChangeInfo()}>Thanh toán</Button>
                </>
              ) : (
                ""
              )}
              {current > 0 ? <Button onClick={Prev}>Prev</Button> : ""}
            </div>
          </Card>
        );
      case 3:
        // Tạm hoãn
        return (
          <Card className="card-boxShadow">
            <TamHoanForm
              data={data.data}
              ref={formRef}
              current={current}
              onFinishScreen={(val) => handleSetPendingStep(val)}
            />

            {current === 2 ? renderPrewviewForm(formRef) : ""}

            <div className={"card-boxShadow"} style={{ position: "sticky", bottom: 0 }}>
              {current < 2 ? <Button onClick={Next}>Next</Button> : ""}
              {current === 2 ? (
                <>
                  <Button onClick={handleSavePending}>Lưu lại</Button>
                  <Button onClick={() => handlePurchase()}>Thanh toán</Button>
                </>
              ) : (
                ""
              )}
              {current > 0 ? <Button onClick={Prev}>Prev</Button> : ""}
            </div>
          </Card>
        );
      case 4:
        return (
          <Card className="card-boxShadow">
            <Dissolution
              data={data.data}
              ref={formRef}
              current={current}
              onFinishScreen={(val) => handleSetDissolutionStep(val)}
            />

            {current === 2 ? renderPrewviewForm(formRef) : ""}

            <div className={"card-boxShadow"} style={{ position: "sticky", bottom: 0 }}>
              {current < 2 ? <Button onClick={Next}>Next</Button> : ""}
              {current === 2 ? (
                <>
                  <Button onClick={handleSaveDissolution}>Lưu lại</Button>
                  <Button onClick={handlePurchaseDissolution}>Thanh toán</Button>
                </>
              ) : (
                ""
              )}
              {current > 0 ? <Button onClick={Prev}>Prev</Button> : ""}
            </div>
          </Card>
        );
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
      case 3:
        return <CCSteps step={current} data={pendingStep} />;
      case 4:
        return <CCSteps step={current} data={dissolutionStep} />;
      default:
        return null;
    }
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

  const handleSetPendingStep = (val) => {
    let data = [
      {
        title: "Bước 1",
        desc: "Chọn loại hình",
      },
    ];
    data.push(
      {
        title: `Bước 2`,
        desc: `${val.children}`,
      },
      {
        title: `Bước 3`,
        desc: "Preview",
      }
    );
    setPendingStep(data);
  };

  const handleSetDissolutionStep = (val) => {
    let data = [
      {
        title: "Bước 1",
        desc: "Chọn loại hình",
      },
    ];
    data.push(
      {
        title: `Bước 2`,
        desc: `${val.children}`,
      },
      {
        title: `Bước 3`,
        desc: "Preview",
      }
    );
    setDissolutionStep(data);
  };

  const closeModal = () => {
    setChildModal({
      ...childModal,
      visible: false,
    });
  };

  const handlePurchaseChangeInfo = () => {
    let val = formRef.current.getFieldsValue();
    let params = {
      track: {
        step: 1,
        status: "progress",
      },
      payment: 0,
      data: {
        ...val,
      },
    };
    console.log(val);
    paymentService(params);
  };

  const handlePurchaseCreateCompany = () => {
    let val = formRef.current.getFieldsValue();
    let body = {
      ...val,
      create_company: {
        ...val.create_company,
        company_opt_career: val.create_company.company_opt_career.map((item) => ({
          value: item.value,
          name: item.name,
          code: item.code,
        })),
      },
    };

    let params = {
      track: {
        step: 1,
        status: "progress",
      },
      payment: 0,
      data: {
        ...body,
      },
    };

    paymentService(params);
  };

  const handlePurchaseDissolution = () => {
    console.log("handlePurchaseDissolution");
    let val = formRef.current.getFieldsValue();

    let params = {
      track: {
        step: 1,
        status: "progress",
      },
      payment: 0,
      data: {
        ...val,
      },
    };

    console.log("handlePurchaseDissolution", params);
    paymentService(params);
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
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSave = () => {
    let val = formRef.current.getFieldsValue();
    let body = {
      ...val,
      create_company: {
        ...val.create_company,
        company_opt_career: val?.create_company?.company_opt_career?.map((item) => ({
          value: item.value,
          name: item.name,
          code: item.code,
        })),
      },
    };

    let params = {
      track: {
        step: 1,
        status: "progress",
      },
      payment: 0,
      data: {
        ...body,
      },
    };
    console.log(val);
    // console.log(val.create_company.present_person, create_company_files[val.create_company.present_person]);
    // saveService(params);
  };

  const handleSaveChangeInfo = () => {
    let val = formRef.current.getFieldsValue();
    let params = {
      track: {
        step: 1,
        status: "progress",
      },
      payment: 0,
      data: {
        ...val,
      },
    };
    // console.log(val);
    saveService(params);
  };

  const handleSavePending = () => {
    let val = formRef.current.getFieldsValue();
    console.log(val);
  };

  const handleSaveDissolution = () => {
    console.log("save dissolution");
  };

  // Service
  const saveService = (params) => {
    ProductService.createCompany(params)
      .then((res) => {
        if (res.data.status === 200) {
          message.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const paymentService = (params) => {
    const date = new Date();
    var createDate = dateformat(date, "yyyymmddHHmmss");
    var orderId = dateformat(date, "HHmmss");

    params.createDate = createDate;
    params.orderId = orderId;

    ProductService.createCompanyWithPayment(params)
      .then((res) => {
        if (res.data.status === 200) {
          return (window.location.href = res.data.url);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.mainContent}>
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
