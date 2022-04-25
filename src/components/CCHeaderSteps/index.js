import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { Skeleton, Card } from "antd";
const CCSteps = (props) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(props.step);
  }, [props.step]);

  const offset = props?.data?.length;

  return (
    <Card>
      <div className={styles.listStep} style={{ "--offset": offset }}>
        {props?.data?.map((item, index) => {
          return (
            <div
              key={index}
              className={clsx([
                styles.stepItem,
                {
                  [styles.sticky]: props.step == index,
                },
              ])}
            >
              <div className={clsx([styles.stepContent])}>
                <div className={styles.icon}>
                  <Skeleton.Avatar active />
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>{item.title}</div>
                  <div className={styles.desc}>{item.desc}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default CCSteps;
