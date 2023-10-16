import React from 'react';
import {
  Input,
  Checkbox,
  Switch,
  Button,
  Select,
  InputNumber,
  Radio,
  DatePicker,
} from 'antd';
import _ from 'lodash';

const mapOptions = (options: any[]) => {
  if (!_.isArray(options)) {
    throw new Error('Options should be array in form builder meta.');
  }
  return options.map((opt) => {
    if (_.isArray(opt)) {
      return { value: opt[0], label: opt[1] };
    } else if (_.isPlainObject(opt)) {
      return opt;
    } else {
      return { value: opt, label: opt };
    }
  });
};
const defineAntdWidgets = (
  defineWidget: (arg0: string, arg1: any, arg2?: (field: any) => any) => void
) => {
  defineWidget('checkbox', Checkbox, (field: any) => {
    return { ...field, valuePropName: 'checked' };
  });
  defineWidget('switch', Switch, (field) => {
    return { ...field, valuePropName: 'checked' };
  });

  defineWidget('button', Button);
  defineWidget('input', Input);
  defineWidget('password', Input.Password);
  defineWidget('textarea', Input.TextArea);
  defineWidget('number', InputNumber);
  defineWidget('date-picker', DatePicker);
  defineWidget('radio', Radio);

  defineWidget('radio-group', Radio.Group, (field) => {
    if (field.options && !field.children) {
      const RadioComp = field.buttonGroup ? Radio.Button : Radio;
      return {
        ...field,
        widgetProps: {
          ...field.widgetProps,
          name: field.key,
        },
        children: mapOptions(field.options).map((opt) => (
          <RadioComp value={opt.value} key={opt.value}>
            {opt.label}
          </RadioComp>
        )),
      };
    }
    return field;
  });
  defineWidget('checkbox-group', Checkbox.Group, (field) => {
    if (field.options && !field.children) {
      return {
        ...field,
        children: mapOptions(field.options).map((opt) => (
          <Checkbox value={opt.value} key={opt.value}>
            {opt.label}
          </Checkbox>
        )),
      };
    }
    return field;
  });

  defineWidget('select', Select, (field) => {
    if (field.options && !field.children) {
      return {
        ...field,
        children: mapOptions(field.options).map((opt) => (
          <Select.Option
            label={opt.label}
            value={opt.value}
            key={opt.value}
            disabled={opt.disabled}
          >
            {opt.children || opt.label}
          </Select.Option>
        )),
      };
    }
    return field;
  });
};

// FormBuilder.
export default defineAntdWidgets;
