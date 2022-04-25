import React from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
const CCButton = (props) => {
  return (
    <button
      className={clsx([
        styles.btn,
        {
          [styles.upper]: props?.type === "upper",
          [styles.link]: props?.link,
          [styles.outline]: props?.outline,
          [styles.fill]: props?.fill,
        },
      ])}
      {...props}
    >
      <span>{props.children}</span>
    </button>
  );
};

export default CCButton;