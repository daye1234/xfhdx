import * as React from 'react';

import { DatePicker } from 'antd';
import { SearchFieldPayload } from '../types';

// eslint-disable-next-line react/display-name
export default (payload?: SearchFieldPayload) => {
  return <DatePicker {...(payload && payload.props)} />;
};
