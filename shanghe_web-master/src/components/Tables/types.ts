/*
 * Created: 2020-08-11 13:38:59
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */

import { ColumnProps } from 'antd/lib/table';
import { PaginationProps } from 'antd/lib/pagination/Pagination';

export type ValidateError = {
  [fieldName: string]: {
    errors: {
      message: string;
      field: string;
    }[];
  };
};

export type SearchInfo = {
  values: any;
  page: number;
  pageSize: number;
};

export type SearchFunc<T = void> = (
  page: number,
  values?: any,
  clearPagination?: boolean
) => Promise<T>;

export type SearchResponse<T> = {
  dataSource: T[];
  total: number;
};

export type FieldRenderer = (payload?: any) => React.ReactNode;

export type RendererType = 'input' | 'select' | 'datePicker' | 'treeSelect';

export type SearchField = {
  /** 条件名称 */
  label: string;
  /** 条件别名，会作为 onSearch 时 values 的 key 名 */
  name: string;
  /** 渲染的组件类型 */
  type?: RendererType;
  /** 当不使用自带的组件类型时，可以自己写 renderer */
  renderer?: FieldRenderer;
  /** antd 的表单验证规则 */
  validationRule?: any;
  /** 初始值 */
  initialValue?: any;
  /** 表单项的 span 值, 默认 6 */
  span?: number;
  /** 传给渲染的组件的参数 */
  payload?: SearchFieldPayload;
};

export type SearchFieldPayload = {
  /** props that pass to the main component */
  props?: any;
  [key: string]: any;
};

export type RowAction = {
  label: string;
  children?: RowAction[];
  action?: (record: any) => void;
};

export type Plugin = {
  colSpan?: number;
  renderer: (
    selectedRowKeys: string[],
    selectedRows: any[],
    clearSelectionCallback: () => void
  ) => React.ReactNode;
};

export type Expand = {
  title: string;
  dataIndex: string;
  render?: (text: any, record?: any) => React.ReactNode;
};

/** Your component's props */
export interface IDataTableProps {
  name?: string;
  refresh?: boolean; // 是否显示刷新按钮
  showSearchFields?: boolean; // 是否显示头部搜索框
  initialColumns: ColumnProps<any>[];
  searchFields: SearchField[];
  rowActions?: RowAction[];
  enableListSelection?: boolean;
  plugins?: Plugin[];
  /** 表格行 key 的取值 */
  rowKey: (record: any) => string;
  title?: React.ReactNode;
  searchBtnText?: string;
  clearBtnText?: string;
  listSelectionBtnText?: string;
  /** 最大的表单项显示数，当表单项超过此数值时，会自动出现 collapse 按钮 */
  maxVisibleFieldCount?: number;
  pageSize?: number;
  /** handle form validate error */
  onValidateFailed?: (err: ValidateError) => void;
  /** 页面加载完成后是否立即加载数据 */
  loadDataImmediately?: boolean;
  /** 执行 search 动作，返回一个 AxiosPromis */
  onSearch<T>(info: SearchInfo): Promise<SearchResponse<T>>;
  /** reject handler */
  onError?(err: any): void;
  rowSelection?: any;
  affixTarget?: () => HTMLElement;
  affixOffsetTop?: number;
  affixOffsetBottom?: number;
  initialExpands?: Expand[];
}

/** Your component's state */
export interface IDataTableState {
  columns: ColumnProps<any>[];
  data: any[];
  page: number;
  currentValues: any;
  pagination: PaginationProps;
  tableLoading: boolean;
  searchButtonLoading: boolean;
  selectedRowKeys: string[];
  selectedRows: any[];
}

export type IDropdown = {
  label: string;
  icon?: React.ReactNode;
  action?: () => void;
  disable: boolean;
};

export interface IDropdownProps {
  data: IDropdown[];
  selectedRows: any[];
  clearSelection?: any;
}
