import { Empty } from 'antd';
import React from 'react';

function NoData() {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      imageStyle={{
        height: 100,
      }}
    />
  );
}

export default NoData;
