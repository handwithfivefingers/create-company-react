import clsx from 'clsx';
import React from 'react';
import styles from './Button.module.scss';
import { makeid } from 'src/helper/Common';
const CCButton = (props) => {
  return (
    <button
      key={makeid(8)}
      className={clsx([
        styles.btn,
        {
          [styles.upper]: props?.type === 'upper',
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
