import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Space,
  Steps,
  Button,
  PageHeader,
  Image,
  Menu,
  Dropdown,
  Tag,
  Typography,
  Row,
  Col,
  Divider,
  Skeleton,
  message,
} from "antd";
import ProductForm from "../../../components/Form/ProductForm";
import ContactForm from "../../../components/Form/Contact";
import CreateCompany from "../../../components/Form/CreateCompany";
import ProductCard from "../../../components/Products";
import ProductService from "../../../service/ProductService";
import CCPageHeader from "../../../components/CCPageHeader";
import CategoryService from "../../../service/UserService/CategoriesService";
import CardCategory from "../../../components/CardCategory";
import styles from "./styles.module.scss";
const { Paragraph } = Typography;

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getScreenData();
  }, []);

  const getScreenData = () => {
    setLoading(true);
    CategoryService.getCategories()
      .then((res) => {
        const { status, data } = res.data;
        if (status === 200) {
          console.log(data);
          setProduct(data);
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.cardgrid}>
      <Skeleton active loading={loading}>
        {product?.map((item) => {
          return <CardCategory data={item} key={item._id} />;
        })}
      </Skeleton>
    </div>
  );
};

export default ProductPage;
