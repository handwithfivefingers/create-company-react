import { Skeleton, Typography, Layout, Row, Col, Tag, Avatar } from "antd";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { number_format } from "../../../helper/Common";
import ProductService from "../../../service/ProductService";
import styles from "./Section3.module.scss";
import Link from "next/link";
import IconThanhLap from "./../../../assets/img/thanhlap.png";
import IconThayDoi from "./../../../assets/img/thaydoi.png";
import IconTamNgung from "./../../../assets/img/tamngung.png";
import IconGiaiThe from "./../../../assets/img/giaithe.png";

const Section3 = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.data);
  }, [props]);
  //   const getScreenData = () => {
  //     ProductService.getProducts().then((res) => {
  //       if (res.data.status === 200) {
  //         let { data } = res.data;
  //         setData(() => {
  //           return data.map((item, i) => ({
  //             name: item.name,
  //             info: desc[i].info,
  //             price: item.price,
  //             icon: desc[i].url,
  //             slug: item.slug,
  //           }));
  //         });
  //       }
  //     });
  //   };
  const desc = [
    {
      info: "Giải pháp thành lập doanh nghiệp trọn gói, dịch vụ chuyên nghiệp, thủ tục chính xác và nhanh gọn, hoàn thành hồ sơ đúng hẹn.",
      url: IconThanhLap.src,
    },
    {
      info: "Thời gian giải quyết nhanh, tư vấn chuyên nghiệp, thủ tục chính xác, không phát sinh chi phí.",
      url: IconThayDoi.src,
    },
    {
      info: "Dịch vụ trọn gói đã bao gồm mọi thủ tục soạn nộp hồ sơ và nhận kết quả, trả kết quả đến bạn.",
      url: IconTamNgung.src,
    },
    {
      info: "Quy trình tư vấn giải thể chặt chẽ, sự phối hợp của các bộ phận tư vấn thủ tục giải thể công ty được tiến hành nhanh chóng.",
      url: IconGiaiThe.src,
    },
  ];
  return (
    <div className={clsx(styles.sectionItems, "container")}>
      <div className={styles.contentItem}>
        <Typography.Title className={styles.title}>Chọn dịch vụ</Typography.Title>
        <div className={styles.serviceItems}>
          {/*          
          {data?.map((item, i) => {
            return (
              <Link href={`/san-pham/${item.slug}`} passHref key={item._id}>
                <div className={clsx([styles.serviceItem])} key={item._id}>
                  <div className={styles.serviceIcon}>
                    {<Avatar shape="square" src={item.icon} size={40} /> || (
                      <Skeleton.Avatar active size="large" />
                    )}
                  </div>
                  <Typography.Title className={styles.serviceTitle} level={3}>
                    {item?.name}
                  </Typography.Title>
                  <div className={styles.serviceContent}>
                    <p>
                      {item.info}
                    </p>
                  </div>
                  <div className={styles.price}>
                    Giá: <span>{number_format(item.price)}</span> VND
                    {i === 1 ? "/ thông tin cần thay đổi" : ""}
                  </div>
                </div>
              </Link>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default Section3;
