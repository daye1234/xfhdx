import * as React from 'react';

import { TreeSelect } from 'antd';
import { SearchFieldPayload } from '../types';

// eslint-disable-next-line react/display-name
export default (payload?: SearchFieldPayload) => {
  return <TreeSelect {...(payload && payload.props)} />;
};
