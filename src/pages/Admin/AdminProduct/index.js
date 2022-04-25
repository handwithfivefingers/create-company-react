import CareerForm from "src/components/Form/CarrerForm";
import {
  FormOutlined, MinusSquareOutlined, PlusSquareOutlined
} from "@ant-design/icons";
import { Button, Card, Drawer, message, Modal, Space, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import CategoryForm from "src/components/Form/CategoryForm";
import FormProduct from "src/components/Form/Product";
import axios from "src/config/axios";
import { number_format } from "src/helper/Common";
import AdminProductService from "src/service/AdminService/AdminProductService";

const { TabPane } = Tabs;
const AdminProduct = (props) => {
  console.log(props);
  const [data, setData] = useState([]);
  const [cateData, setCateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [career, setCareer] = useState([]);

  const [childModal, setChildModal] = useState({
    visible: false,
    width: 0,
    component: null,
  });

  const formRef = React.useRef();

  useEffect(() => {
    getScreenData();
    getCateData();
    getCareer();
  }, []);

  const getCareer = async () => {
    const { data } = await axios.get(`/api/nganhnghe`);
    // console.log(data);
    if (data.status === 200) {
      setCareer(data.data);
    } else message.error(data.message || data.error);
  };

  const getScreenData = () => {
    setLoading(true);
    AdminProductService.getProduct()
      .then((res) => {
        if (res.data.status === 200) {
          let _data = res.data.data.map((el) => ({
            ...el,
            children: el.children.map((item) => ({
              ...item,
              _uuid: makeid(9),
            })),
          }));
          setData(_data);
        }
      })
      .finally(() => setLoading(false));
  };

  const getCateData = () => {
    AdminProductService.getCategory()
      .then((res) => {
        if (res.data.status === 200) {
          setCateData(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const onHandleEdit = (record) => {
    if (record) {
      setChildModal({
        visible: true,
        width: "50%",
        component: (
          <FormProduct
            type="edit"
            data={record}
            onEventEdit={(output) => onEventEdit(output)}
            onFinishScreen={() => {
              getScreenData();
              closeModal();
            }}
          />
        ),
      });
    }
  };

  const onHandleAdd = () => {
    setChildModal({
      visible: true,
      width: "50%",
      component: (
        <FormProduct
          type="add"
          onEventAdd={(output) => onEventAdd(output)}
          onFinishScreen={() => {
            getScreenData();
            closeModal();
          }}
        />
      ),
    });
  };

  const onEventEdit = (params) => {
    AdminProductService.editProduct(params)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const onEventAdd = (params) => {
    AdminProductService.createProduct(params)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        getScreenData();
      });
  };

  const onHandleDelete = (record) => {
    Modal.confirm({
      title: "Bạn có chắc ?",
      content: `Muốn xóa sản phẩm ${record.name}`,
      onCancel: () => closeModal(),
      onOk: () => {
        AdminProductService.deleteProduct(record)
          .then((res) => {
            if (res.data.status === 200) {
              message.success(res.data.message);
            }
          })
          .finally(() => {
            setLoading(false);
            getScreenData();
          });
      },
    });
  };

  const closeModal = () => {
    setChildModal({
      ...childModal,
      visible: false,
    });
  };

  const onHandleCreateCategory = () => {
    // console.log("create category");
    setChildModal({
      visible: true,
      width: "50%",
      component: (
        <CategoryForm
          onFinishScreen={(output) => {
            // getScreenData();
            addCategory(output);
            closeModal();
          }}
        />
      ),
    });
  };

  const onHandleAddCareer = () => {
    setChildModal({
      visible: true,
      width: "50%",
      component: (
        <CareerForm
          onFinishScreen={(output) => {
            // getScreenData();
            addCareer(output);
            closeModal();
          }}
        />
      ),
    });
  };

  const addCareer = (val) => {
    let params = {
      name: val.career_name,
      code: val.career_code,
    };
    AdminProductService.createCareer(params)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const addCategory = (val) => {
    AdminProductService.createCategory(val)
      .then((res) => {
        if (res.data.status === 201) {
          message.success(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        getCateData();
      });
  };

  const deleteCareer = (record) => {
    AdminProductService.deleteCareer(record._id)
      .then((res) => {
        if (res.data.status === 200) {
          message.success(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        getCareer();
      });
  };

  function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  return (
    <>
      <Card
        title="Sản phẩm"
        extra={
          <Space>
            <Button type="action" onClick={onHandleAdd} icon={<PlusSquareOutlined />}>
              Thêm sản phẩm
            </Button>
            <Button type="action" onClick={onHandleCreateCategory} icon={<PlusSquareOutlined />}>
              Thêm danh mục
            </Button>
            <Button type="action" onClick={onHandleAddCareer} icon={<PlusSquareOutlined />}>
              Thêm ngành nghê
            </Button>
          </Space>
        }
        bordered={false}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Danh mục" key="1">
            <Table loading={loading} dataSource={cateData} pagination={false} size="small">
              <Table.Column title="Danh mục" render={(val, record, index) => record.name} />
              <Table.Column title="Giá" width={"25%"} render={(val, record, index) => record.price} />
              <Table.Column title="Loại" width="100px" render={(val, record, index) => record.type} />
            </Table>
          </TabPane>
          <TabPane tab="Sản phẩm" key="2">
            <Table
              loading={loading}
              dataSource={data}
              pagination={false}
              rowKey={(record) => record._uuid || record._id}
              size="small"
            >
              <Table.Column title="Tên sản phẩm" render={(val, record, i) => record?.name} />
              <Table.Column
                title="Giá tiền"
                width={"25%"}
                render={(val, record, i) => `${number_format(record?.price)} VND`}
              />
              <Table.Column
                title=""
                width="100px"
                render={(val, record, i) => {
                  return (
                    <Space>
                      <Button onClick={(e) => onHandleEdit(record)} icon={<FormOutlined />} />
                      <Button onClick={(e) => onHandleDelete(record)} icon={<MinusSquareOutlined />} />
                    </Space>
                  );
                }}
              />
            </Table>
          </TabPane>
          <TabPane tab="Ngành nghề" key="3">
            <Table dataSource={career} rowKey={(record) => record._uuid || record._id} size="small">
              <Table.Column title="Tên ngành" render={(val, record, i) => record.name} />
              <Table.Column title="Mã ngành" width={"25%"} render={(val, record, i) => record.code} />
              <Table.Column
                width="100px"
                title=""
                render={(val, record, i) => (
                  <Space>
                    <Button onClick={(e) => onHandleEdit(record)} icon={<FormOutlined />} />
                    <Button onClick={(e) => deleteCareer(record)} icon={<MinusSquareOutlined />} />
                  </Space>
                )}
              />
            </Table>
          </TabPane>
        </Tabs>
      </Card>
      {/* <Modal footer={null} visible={childModal.visible} width={childModal.width} onCancel={closeModal} destroyOnClose>
        {childModal.component}
      </Modal> */}
      <Drawer visible={childModal.visible} width={childModal.width} onClose={closeModal} destroyOnClose>
        {childModal.component}
      </Drawer>
    </>
  );
};

export default AdminProduct;
