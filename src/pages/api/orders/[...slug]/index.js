import { useRouter } from 'next/router';
import React from 'react';

const OrderSlug = (props) => {

  const router = useRouter();
  console.log(router.query)
  return (
    <div>
Order pageeeeee
    </div>
  );
};

export default OrderSlug;

