import React from "react";
import { Skeleton, Typography, Tag } from "antd";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { number_format } from "../../helper/Common";
import { Link } from "react-router-dom";
const CardCategory = (props) => {
  return (
    <Link to={`/user/san-pham/${props?.data?.slug}`}>
      <div className={clsx([styles.card])}>
        <div className={styles.cardIcon}>
          <Skeleton.Avatar size="large" active />
        </div>
        <Typography.Title className={styles.cardTitle} level={3}>
          {props?.data?.name}
        </Typography.Title>
        <div className={styles.cardContent}>
          <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          <Tag color="#f50">Giá Tiền: {number_format(props?.data?.price)}</Tag>
        </div>
      </div>
    </Link>
  );
};

export default CardCategory;
