import React, { useEffect } from "react";
import { Row, Col, Typography, Button, Image } from "antd";
import styles from "./Section1.module.scss";
import CCButton from "../../Button";
import Link from "next/link";
// import Banner from "./../../../assets/img/banner-s1.png";
import Banner from "./../../../assets/img/banner-2-s1.png";

// import BannerHP from "./../../../assets/img/banner-s1.png";
import clsx from "clsx";
import Aos from "aos";
const Section1 = (props) => {
  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);
  return (
    <div
      className={styles.sectionItems}
      style={{ backgroundImage: `url(${Banner.src})` }}
    >
      <div className={clsx(["container", styles.container])}>
        <div className={[styles.sectionItem1, styles.sectionItem].join(" ")}>
          <div className={styles.itemContent}>
            <Typography.Title
              level="h1"
              className={styles.title}
              data-aos="fade-up"
            >
              Giải pháp toàn diện cho doanh nghiệp
            </Typography.Title>
            <p className={clsx([styles.p, "h"])} data-aos="fade-up">
              Chúng tôi cam kết bảo mật thông tin. Quy trình đơn giản, nhanh
              chóng với đội ngũ hỗ trợ chuyên nghiệp.
            </p>
            <Link href="#san-pham" passHref  data-aos="fade-up">
              <CCButton type="upper" link style={{ fontWeight: "bold" }}>
                <a>Bắt đầu ngay</a>
              </CCButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
