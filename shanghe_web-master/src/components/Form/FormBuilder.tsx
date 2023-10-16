import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import find from 'lodash/find';
import { Col, Row, Form, Checkbox } from 'antd';
import FormBuilderField from './FormBuilderField';
// import DefineAntdWidgets from './defineAntdWidgets'
import './FormBuilder.scss';

import { metaType, fieldType } from './type';
interface widgetType {
  widget?: any;
  metaConvertor?: (arg0: fieldType) => fieldType;
}
const widgetMap = {};
function FormBuilder(props: any) {
  const { getMeta, form } = props;
  const meta = getMeta ? getMeta(form, props) : props.meta;
  return (
    <FormBuilderInner
      {...props}
      form={form ? form.current || form : null}
      meta={meta}
    />
  );
  // }
}

function FormBuilderInner(props: any) {
  const {
    meta,
    viewMode,
    initialValues,
    disabled = false,
    form = null,
  } = props;

  if (!meta) return null;
  const newMeta = normalizeMeta(meta);
  newMeta.viewMode = newMeta.viewMode || viewMode;
  newMeta.initialValues = newMeta.initialValues || initialValues;
  const { fields, columns = 1, gutter = 10 } = newMeta;
  const elements = fields.map((field: { key: React.ReactText }) => (
    <FormBuilderField
      key={field.key}
      field={field}
      disabled={disabled}
      meta={newMeta}
      form={form}
    />
  ));
  if (columns === 1) {
    return elements;
  }
  // 如果是多行
  const rows = [];
  // for each column , how many grid cols
  const spanUnit = 24 / columns;
  // eslint-disable-next-line
  for (let i = 0; i < elements.length; ) {
    const cols = [];
    for (
      let j = 0;
      (j < columns || j === 0) && // 总列宽度小与列
      i < elements.length && // 元素存在
      (!['left', 'both'].includes(fields[i].clear) || j === 0); // 字段不需要换行

    ) {
      const fieldSpan = fields[i].colSpan || 1;
      cols.push(
        <Col key={j} span={Math.min(24, spanUnit * fieldSpan)}>
          {elements[i]}
        </Col>
      );
      j += fieldSpan;
      // 如果清除右侧，则进入下一个元素
      if (['both', 'right'].includes(fields[i].clear)) {
        i += 1;
        break;
      }
      i += 1;
    }
    rows.push(
      <Row key={i} gutter={gutter}>
        {cols}
      </Row>
    );
  }
  return rows;
}
function normalizeMeta(meta: any) {
  let fields = isArray(meta) ? meta : meta.fields || meta.elements;
  if (!fields) fields = [meta];
  fields = fields.map((field: fieldType) => {
    const widget = getWidget(field.widget);
    const viewWidget = getWidget(field.viewWidget);
    const dynamic = field.dynamic !== false;

    // 查找元转换器
    const item: widgetType | null = find(
      Object.values(widgetMap),
      (entry: fieldType) =>
        (entry.widget === widget || entry.widget === viewWidget) &&
        entry.metaConvertor
    );
    if (item) {
      const newField = item.metaConvertor(field);
      if (!newField) {
        throw new Error(
          `metaConvertor of '${String(field.widget)}' must return a field`
        );
      }
      return { ...newField, viewWidget, widget, dynamic };
    }
    return { ...field, widget, viewWidget, dynamic };
  });
  if (isArray(meta) || (!meta.fields && !meta.elements)) {
    return { fields };
  }
  return {
    ...meta,
    fields,
  };
}
// 获取组件
function getWidget(widget: string | React.Component) {
  if (!widget) return null;
  if (typeof widget === 'string') {
    if (!widgetMap[widget] || !widgetMap[widget].widget) {
      throw new Error(
        `Widget '${widget}' not found, did you defined it by FormBuilder.defineComponent?`
      );
    }
    return widgetMap[widget].widget;
  }
  return widget;
}

// 添加默认组件
FormBuilder.defineWidget = (
  name: string | number,
  widget: any,
  metaConvertor: (arg0: fieldType) => fieldType
) => {
  if (widgetMap[name]) throw new Error(`Widget "${name}" already defined.`);
  widgetMap[name] = {
    widget,
    metaConvertor,
  };
};
FormBuilder.useForceUpdate = () => {
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);
  return forceUpdate;
};
FormBuilder.useForm = (f: any) => {
  throw new Error('FormBuilder.useForm is removed. Please use Form.useForm().');
};
FormBuilder.createForm = (ctx: any) => {
  throw new Error(
    'FormBuilder.createForm is removed. Please use Form.useForm for functional component and ref for class component.'
  );
};
export default FormBuilder;
