import * as React from 'react';
import { Form, Button, Modal } from 'antd';
import FormBuilder from '@components/Form';
import { useState } from 'react';

export default function DefineWidgets() {
  const [pending, setpending] = useState(false);
  const [form] = Form.useForm();
  const handleFinish = (values: any) => {
    setpending(true);
    setTimeout(() => {
      setpending(false);
      Modal.success({
        title: 'Success',
        content: 'Infomation updated.',
      });
    }, 1500);
  };
  const options = ['Apple', 'Orange', 'Banana'];
  const meta = {
    columns: 3, //显示列数
    initialValues: {
      textarea: 'textarea',
    },
    // disabled: true,
    // viewMode: true, //为ture,不能编辑
    formItemLayout: [8, 16], // Must set this for inline layout
    fields: [
      {
        // noFormItem: true,
        key: 'input', // 键
        label: 'input',
        widget: 'input', // 自定义组件
        // initialValue: 'hello', // 默认值
        required: true, // 不能为空
        message: '不能为空',
        placeholder: 'input search text',
        tooltip: '提示信息', // 提示
        // formItemLayout: [8, 16], //label宽度，输入框宽度
        validateTrigger: 'onclick',
        trigger: 'onChange',
        // forwardRef: true,
        // antd自带参数
        // help: '提示信息',
        // extra: '额外的提示信息',
        // noStyle: true,
        // validateStatus: 'warning',
        // hasFeedback: true,
        // readOnly: true,
        // viewMode: true,
        // getValueProps: (value: any) => {},
      },
      {
        key: 'password',
        label: 'Password',
        widget: 'password',
        rules: [
          {
            required: true,
            message: 'Please input your password!',
          },
        ],
      },
      {
        key: 'confirmpassword',
        label: 'confirmpassword',
        widget: 'password',
        // clear: 'left', //清除右边的
        dependencies: ['password'],
        rules: [
          {
            required: true,
            message: '请输入确认密码!',
          },
          ({ getFieldValue }: any) => ({
            validator(rule: any, value: any) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                'The two passwords that you entered do not match!'
              );
            },
          }),
        ],
      },
      {
        key: 'textarea',
        label: 'textarea',
        widget: 'textarea',
      },
      { key: 'number', label: 'number', widget: 'number' },
      {
        key: 'select',
        label: 'Select',
        widget: 'select',
        options,
      },
      { key: 'date-picker', label: 'Date Picker', widget: 'date-picker' },
      {
        key: 'radio-group',
        label: 'Radio Group',
        widget: 'radio-group',
        // forwardRef: true,
        buttonGroup: false, // 如果true，改为按钮按时
        options,
      },

      { key: 'checkbox', label: 'Checkbox', widget: 'checkbox' },
      {
        key: 'checkbox-group',
        label: 'Checkbox Group',
        widget: 'checkbox-group',

        options,
      },
      {
        name: 'switch',
        label: 'Switch',
        widget: 'switch',
        valuePropName: 'checked',
      },

      {
        key: 'label1',
        colSpan: 2, // 占2行
        render() {
          return (
            <div>
              自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件自定义组件
            </div>
          );
        },
      },
    ],
  };
  return (
    <Form onFinish={handleFinish}>
      <FormBuilder meta={meta} form={form} />
      <Form.Item wrapperCol={{ span: 10, offset: 10 }}>
        <Button type="primary" htmlType="submit" disabled={pending}>
          {pending ? 'Updating...' : 'Update'}
        </Button>
      </Form.Item>
    </Form>
  );
}
