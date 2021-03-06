import { ClockCircleOutlined } from '@ant-design/icons';
import { PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeid } from 'src/helper/Common';
import styles from './styles.module.scss';

const UserHeader = (props) => {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date().toString('HH:mm'));

  const commonReducer = useSelector((state) => state.commonReducer);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toString('HH:mm'));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageHeader
      key="userHeader"
      ghost={false}
      className={styles.siteHeader}
      onBack={() => navigate(-1)}
      title={<div key={makeid(9)}>{commonReducer?.title}</div>}
      // subTitle="This is a subtitle"
      extra={[<ClockCircleOutlined key="clock-1" color="#6f3a3a" />, <span style={{ color: '#6f3a3a' }}>{time}</span>]}
    />
  );
};

export default React.memo(UserHeader);
