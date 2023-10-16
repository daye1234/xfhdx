import * as React from 'react';
import { Select } from 'antd';
import { SearchFieldPayload } from '../types';

type SelectOption = {
  key: string;
  label: string;
  value: string;
};

// eslint-disable-next-line react/display-name
export default (payload?: SearchFieldPayload) => {
  if (!payload || !payload.options) {
    console.warn('select renderere expected `options`');
    return null;
  }
  const options = payload.options as SelectOption[];
  return (
    <Select {...(payload && payload.props)}>
      {options.map((option) => {
        return (
          <Select.Option key={option.key} value={option.value}>
            {option.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};
