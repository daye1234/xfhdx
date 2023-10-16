// import { boolean } from 'yargs'
import { Rule } from 'antd/lib/form';

// import { AnyKindOfDictionary } from 'lodash'
interface widgetPropsType {
  placeholder?: string;
  type?: string;
  className?: string;
  class?: string;
  onChange?: (e: Event) => any;
  disabled?: boolean;
  // 其他的属性根据antd对应组件的属性进行选择
  [propName: string]: any;
}
interface formlayout {
  labelCol?: { span: number };
  wrapperCol?: { span: number };
  className: string;
}

interface IFormBuilder {
  meta: metaType; // 先根据getMeta进行处理
  getMeta: (form: any, props: IFormBuilder) => metaType;
  viewMode: any;
  initialValues: any;
  disabled: any;
  form: any;
}

export interface metaType {
  fields?: fieldType[]; // 字段列表
  elements?: fieldType[]; // fields > elements(功能相同)
  form?: any; // form表单
  initialValues?: null; //{name:"姓名"}，对应字段的默认值，层级小与field.initialValue
  formItemLayout?: formlayout;
  viewMode?: boolean; // 是否可编辑 默认false
  disabled?: boolean; // 禁用，默认false

  columns?: number; // 显示行数
  gutter?: number; // 默认为0
  colon?: boolean; // 是否显示冒号 field > meta
  // getValueFromEvent: (...args: any) => any // 设置如何将 event 的值转换成字段值
}

export interface fieldType {
  key?: string; // 键， 写法：input || object.passward
  name?: string | Array<string>; // 键， 写法：input || ['object', 'passward']
  label?: string; // label
  disabled?: boolean; // 禁用，默认false

  options?: any; // 子选项
  fieldProps?: any;
  formItemProps?: any; // formItem的参数值，https://ant.design/components/form-cn/#Form.Item
  // 组件渲染
  // 第一种：
  // 存在render，直接渲染
  render?: () => React.Component;
  // 第二种
  // 默认组件渲染
  widget?: string | React.Component; // 组件
  widgetProps?: widgetPropsType; //组件参数
  // 第三种
  // viewMode为true时
  // renderView > viewWidget>link层级关系
  viewWidget?: string | React.Component; // 组件
  viewWidgetProps?: widgetPropsType; // 组件参数
  // 第四种
  // 前两种不存在且viewMode为true时，以下方法生效
  link?: string; // href
  linkTarget?: string; // target
  /*
   *消息与验证
   */
  required?: boolean; // 是否禁用
  help?: string | React.ReactNode; // 提示信息，如不设置，则会根据校验规则自动生成
  extra?: string | React.ReactNode; // 额外的提示信息，和 help 类似，当需要错误信息和提示文案同时出现时，可以使用这个。
  // message> requiredMessage层级关系
  message?: string; // 错误信息，不设置时会通过模板自动生成
  requiredMessage?: string; // 错误信息
  rules?: Rule[]; // https://ant.design/components/form-cn/#Rule
  validateStatus?: string; // 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'

  /*
   *样式
   */
  // meta.viewMode > field.viewMode > field.readOnly 层级关系
  viewMode?: boolean; // 是否可编辑
  readOnly?: boolean; // 只读
  tooltip?: string | React.ReactNode; // 提示内容
  clear?: Enumerator<string>; // [left, both, right] 清除对应方向的字段进入下一行
  // className > field.formlayout.className
  className?: string;
  // field > meta层级关系
  formItemLayout?: Array<number> | formlayout;
  // field.formItemLayout > (field.colSpan | field.labelCol| field.wrapperCol)
  colSpan?: number; //该字段站多少列
  labelCol?: { span: number; offset: number };
  wrapperCol?: { span: number; offset: number };
  noStyle?: boolean; // 为 true 时不带样式，作为纯字段控件使用，默认false
  noFormItem?: boolean; // 与noStyle方法相同
  // field > meta
  colon?: boolean; // 是否显示冒号

  /*
   *DOM
   */

  // 自定义组件
  renderView?: (
    viewValue: boolean, // 表单中是否存在字段
    form: any, // form表单
    initialValues: string // 默认值
  ) => React.Component;
  children?: (
    fields: fieldType[],
    operation: { add: any; remove: any; move: any }
  ) => React.ReactNode;
  forwardRef?: boolean; //转换
  metaConvertor?: (field: fieldType) => fieldType;

  /*
   *值
   */
  initialValue?: string; // 默认值
  // 默认值函数写法
  // field.initialValue > field.getInitialValue > meta.initialValues层级
  getInitialValue?: (
    field: fieldType,
    initialValues: string, // 默认值
    form: any // form表单
  ) => string; //
  preserve?: boolean; // 当字段被删除时保留字段值
  getValueProps?: (value: any) => any; //获取对应字段的值
  validateTrigger?: string | string[]; // 字段校验的时机, 默认为onChange
  trigger?: string; //// 字段值变更的时机,默认onChange
  // 组件获取值后进行转换，再放入 Form 中
  normalize?: (value: any, prevValue: any, prevValues: any) => any;

  // 具体使用请参考README.md文档，一般情况下使用dependencies参数
  dependencies?: Array<string>; // 所依赖的字段更新时，该字段将自动触发更新与校验。
  shouldUpdate?: (
    prevValues: fieldType,
    currentValues: fieldType
  ) => boolean | boolean; // 自定义字段更新逻辑 ，默认false

  //
  //  没有弄明白
  //
  hasFeedback?: boolean; // 配合 validateStatus 属性使用，展示校验状态图标，建议只配合 Input 组件使用
  htmlFor?: string; // 设置子元素 label htmlFor 属性
  validateFirst?: boolean; // 当某一规则校验不通过时，是否停止剩下的规则的校验。默认false
  valuePropName?: string; // 子节点的属性,例如，Switch的属性为“ checked”。
  getValueFromEvent: (...args: any) => any; // 设置如何将 event 的值转换成字段值
  // 自写参数
  dynamic?: boolean;
}
