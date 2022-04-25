import {
  Typography,
  Image,
  Steps,
  Col,
  Row,
  Grid,
  Timeline,
  Space,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import styles from "./Section2.module.scss";
import BannerHP from "./../../../assets/img/banner-hp.png";
import Aos from "aos";
const { useBreakpoint } = Grid;
const Section2 = () => {
  const [current, setCurrent] = useState(4);
  const screens = useBreakpoint();
  useEffect(() => {
    Aos.init({ duration: 600, offset: -100 });
  }, []);
  return (
    <div className={clsx(styles.section, "container")}>
      <Typography.Title className={styles.title} data-aos="fade-up">
        Dịch vụ 100% trực tuyến
      </Typography.Title>
      <div className={styles.sectionItems}>
        <div
          className={clsx([styles.sectionItem, styles.sectionImage])}
          data-aos="zoom-in"
          data-aos-duration="1000"
        >
          <Image
            src={BannerHP.src}
            alt="..."
            width={BannerHP.width}
            preview={false}
          />
        </div>
        <div className={styles.sectionItem} data-aos="fade-left" data-aos-duration="1000">
          <div className={styles.sectionContent}>
            <div className={styles.sectionDesc}>
              <h4>Quy trình 5 bước đơn giản</h4>
              <Typography.Paragraph className="h">
                Chúng tôi cung cấp dịch vụ với quy trình xử lý thông tin nhanh
                chóng, đơn giản giúp bạn tiết kiệm thời gian và chi phí.
              </Typography.Paragraph>
            </div>
            <div className={styles.sectionTimeline}>
              <Timeline mode="left" style={{ paddingTop: 20 }}>
                <Timeline.Item
                  dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />}
                  color="green"
                  className={"h"}
                >
                  Chọn sản phẩm
                </Timeline.Item>
                <Timeline.Item
                  dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />}
                  color="green"
                  className={"h"}
                >
                  Điền thông tin
                </Timeline.Item>
                <Timeline.Item
                  dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />}
                  color="green"
                  className={"h"}
                >
                  Thanh toán
                </Timeline.Item>
                <Timeline.Item
                  dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />}
                  color="green"
                  className={"h"}
                >
                  Xử lý hồ sơ
                </Timeline.Item>
                <Timeline.Item
                  dot={<CheckCircleOutlined style={{ fontSize: "16px" }} />}
                  color="green"
                  className={"h"}
                >
                  Hoàn tất hồ sơ
                </Timeline.Item>
              </Timeline>
            </div>
            <Space>
              <Typography.Paragraph style={{ fontSize: 14 }}>
                Nếu bạn có thắc mắc hoặc gặp vấn đề trong quá trình đăng ký vui
                lòng liên hệ Hotline 123456789 hoặc Email: abc@gmail.com để được
                hỗ trợ.
              </Typography.Paragraph>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
