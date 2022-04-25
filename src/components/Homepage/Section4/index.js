import clsx from "clsx";
import React from "react";
import styles from "./Section4.module.scss";
import Banner from "./../../../assets/img/bg-review.png";
import { Typography, Carousel } from "antd";

const Section4 = () => {
  return (
    <div
      className={clsx([styles.sectionItems])}
      // style={{ backgroundColor: '#E7E7E7' }}
      style={{ backgroundImage: `url(${Banner.src})` }}
    >
      <div className={clsx(styles.sectionItem, "container")}>
        {/* <Typography.Title level={2}>
          Phần review khách hàng
        </Typography.Title> */}
        <Carousel
          autoplay
          dotPosition={"right"}
        >
          <div>
            <div className={styles.contentStyle}>
              <div className={styles.contentItems}>
                <h3>
                  Quy trình Thành lập doanh nghiệp thật sự rất nhanh chóng và
                  tiện lợi. Đội ngũ hỗ trợ luôn nhiệt tình giúp đỡ tôi với trình
                  độ chuyên môn tuyệt vời.
                </h3>
                <p>Nguyễn Văn A</p>
                <p> Công ty ABC</p>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.contentStyle}>
              <div className={styles.contentItems}>
                <h3>
                  Quy trình Thành lập doanh nghiệp thật sự rất nhanh chóng và
                  tiện lợi. Đội ngũ hỗ trợ luôn nhiệt tình giúp đỡ tôi với trình
                  độ chuyên môn tuyệt vời.
                </h3>
                <p>Nguyễn Văn A</p>
                <p> Công ty ABC</p>
              </div>
            </div>
          </div>
        </Carousel>
        {/* <p>
          It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
        </p> */}
      </div>
    </div>
  );
};

export default Section4;
