import axios from '../config/axios';
import React, { useState, useEffect } from 'react';
import { Card, List, Avatar } from 'antd'
const CareerData = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.career)
  }, []);

  return (
    <Card title=" Career Data">
      {/* {data.map(item => item.name)} */}
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<p>{item.name}</p>}
              description={item.code}
            />
          </List.Item>
        )}
      />,
    </Card>
  );
};

export default CareerData;

export const getServerSideProps = async (ctx) => {
  const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/nganhnghe`)
  return {
    props: { career: data.data }
  }
}