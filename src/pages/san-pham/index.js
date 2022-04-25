import React, { useState, useEffect, useRef } from 'react';
import { Card, Space, Steps, Button, PageHeader, Image, Menu, Dropdown, Tag, Typography, Row, Col, Divider, Skeleton } from 'antd'
import ProductForm from '../../components/Form/ProductForm';
import ContactForm from '../../components/Form/Contact';
import CreateCompany from '../../components/Form/CreateCompany';
import ProductCard from '../../components/Products';
import ProductService from '../../service/ProductService';
import CCPageHeader from '../../components/CCPageHeader';
const { Paragraph } = Typography

const ProductPage = () => {

  const formRef = React.useRef();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getScreenData()
  }, [])

  const getScreenData = () => {
    setLoading(true)
    ProductService.getProducts()
      .then(res => {
        if (res.data.status === 200) {
          let { data } = res.data;
          console.log('data', data)
          setProduct(data)
        } else {
          message.error(res.data.message)
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  return (
    <div className="container">
      <CCPageHeader />
      <Divider />
      <Row gutter={[20, 12]}>
        <Skeleton active loading={loading}>
          {
            product?.map(item => {
              return <Col key={item._id} lg={6} md={12} sm={24} xs={24}><ProductCard data={item} />    </Col>
            })
          }
        </Skeleton>
      </Row>
    </div>
  );
};

export default ProductPage;
