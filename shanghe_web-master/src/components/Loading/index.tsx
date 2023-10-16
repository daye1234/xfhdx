import { Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
function Loading({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: any;
}) {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 60 }} />}
      spinning={isLoading}
      delay={100}
    >
      {children}
    </Spin>
  );
}

export default Loading;
