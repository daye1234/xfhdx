import * as React from 'react';
import { Input } from 'antd';
import { SearchFieldPayload } from '../types';

// eslint-disable-next-line react/display-name
export default (payload?: SearchFieldPayload) => {
  return <Input {...(payload && payload.props)} />;
};
