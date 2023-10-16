/*
 * Created: 2020-08-11 10:46:12
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: https://github.com/NewbeeFE/antd-data-table
 */
import * as React from 'react';
import {
  Button,
  Table,
  Row,
  Col,
  Dropdown,
  Card,
  Checkbox,
  Menu,
  Affix,
  Divider,
} from 'antd';
import { DownOutlined, EyeOutlined, RedoOutlined } from '@ant-design/icons';
import update from 'immutability-helper';
import { PaginationProps } from 'antd/lib/pagination/Pagination';
//import { ValidationRule } from 'antd/lib/form/Form'
import SearchField from './SearchField';
//import { TableRowSelection, ColumnProps } from 'antd/lib/table'
import { ColumnProps } from 'antd/lib/table';
import {
  SearchFunc,
  RowAction,
  IDataTableProps,
  IDataTableState,
} from './types';

const renderActions = (actions: RowAction[], record: any) => {
  return (
    <span>
      {actions.map((action, i) => {
        if (action.children) {
          const menu = (
            <Menu>
              {action.children.map((child, index) => {
                const onClick = () => {
                  child.action && child.action(record);
                };
                return (
                  <Menu.Item key={index}>
                    <a onClick={onClick}>{child.label}</a>
                  </Menu.Item>
                );
              })}
            </Menu>
          );
          return (
            <Dropdown key={i} overlay={menu}>
              <a className="ant-dropdown-link">
                {action.label} <DownOutlined />
              </a>
            </Dropdown>
          );
        } else {
          const onClick = () => {
            action.action && action.action(record);
          };
          return [
            <a key={Math.random()} onClick={onClick}>
              {action.label}
            </a>,
            i === 0 && <Divider key={Math.random()} type="vertical" />,
          ];
        }
      })}
    </span>
  );
};

/** Your component */
export class DataTable extends React.Component<
  IDataTableProps,
  IDataTableState
> {
  static storageKey = 'antd-data-table';
  static defaultProps = {
    pageSize: 10,
    searchBtnText: 'Search',
    clearBtnText: 'Clear',
    listSelectionBtnText: 'List selection',
  };

  readonly actionsColumn =
    this.props.rowActions &&
    ({
      key: 'actions',
      title: '操作',
      render: (record) => {
        return renderActions(this.props.rowActions as RowAction[], record);
      },
    } as ColumnProps<any>);

  readonly shouldShowTableTitle = this.props.title;

  readonly initialColumns = this.actionsColumn
    ? [...this.props.initialColumns, this.actionsColumn]
    : this.props.initialColumns;

  readonly visibleColumnKeys = localStorage.getItem(
    `${DataTable.storageKey}-${this.props.name}-columnIds`
  );

  readonly visibleColumns =
    this.props.enableListSelection === true && this.visibleColumnKeys
      ? this.initialColumns.filter(
          (column) =>
            (this.visibleColumnKeys as string).indexOf(column.key as string) !==
            -1
        )
      : this.initialColumns;

  state: any = {
    columns: ([] = this.visibleColumns),
    data: [],
    page: 1,
    pagination: {
      pageSize: this.props.pageSize,
    } as PaginationProps,
    currentValues: {},
    tableLoading: false,
    searchButtonLoading: false,
    selectedRows: [],
    selectedRowKeys: [],
  };

  private filterPannel = (
    <Card bodyStyle={{ padding: '1em', width: '12em' }}>
      {this.initialColumns.map((column, index) => {
        const isSelected =
          this.state.columns.find((c: any) => c.key === column.key) !==
          undefined;
        const onChange = (e: any) => {
          if (e.target.checked) {
            this.showColumn(column.key);
          } else {
            this.hideColumn(column.key);
          }
        };
        return (
          <p key={index} style={{ marginTop: '.5em', marginBottom: '.5em' }}>
            <Checkbox defaultChecked={isSelected} onChange={onChange}>
              {column.title as any}
            </Checkbox>
          </p>
        );
      })}
    </Card>
  );

  constructor(props: any) {
    super(props);
    if (this.props.enableListSelection && !this.props.name) {
      console.warn('`name` is required while `enableListSelection` is true!');
    }
  }

  fetch: SearchFunc = async (
    page: number,
    values: any = this.state.currentValues,
    clearPagination = false
  ) => {
    const { onError } = this.props;
    this.applyValues(values, async () => {
      try {
        // 这里先简单认为 clearPagination 为 true 就是从 Search button 触发的 fetch
        clearPagination && this.startSearchButtonLoading();
        this.startTableLoading();
        const pager = { ...this.state.pagination };
        const response = await this.props.onSearch({
          page: page,
          // pageSize 有 default
          pageSize: this.props.pageSize as number,
          values: this.state.currentValues,
        });
        pager.total = response.total;
        this.setState({
          pagination: pager,
        });
        this.applyData(response.dataSource);
        clearPagination && this.clearPagination();
      } catch (e) {
        onError && onError(e);
      } finally {
        clearPagination && this.stopSearchButtonLoading();
        this.stopTableLoading();
      }
    });
  };

  private saveVisibleColumnKeysToStorage = (columns: ColumnProps<any>[]) => {
    localStorage.setItem(
      `${DataTable.storageKey}-${this.props.name}-columnIds`,
      columns.map((column) => column.key).join(',')
    );
  };

  private applyData = (data: any[]) => {
    this.setState({ data });
  };

  private applyValues = (values: any, cb: any) => {
    this.setState({ currentValues: values }, cb);
  };

  private clearPagination = () => {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    this.setState({ pagination: pager });
  };

  private handleChange = (pagination: PaginationProps) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({ pagination: pager });
    this.fetch(pager.current || 1); // tslint:disable-line
  };

  private hideColumn = (key?: string | number) => {
    this.state.columns.forEach((column: any, i: number) => {
      if (column.key === key) {
        const columns = update(this.state.columns, {
          $splice: [[i, 1]],
        }) as any;
        this.setState(
          {
            columns,
          },
          () => this.saveVisibleColumnKeysToStorage(columns)
        );
      }
    });
  };

  private clearSelection = () => {
    this.setState({
      selectedRows: [],
      selectedRowKeys: [],
    });
  };

  private showColumn = (key?: string | number) => {
    this.initialColumns.forEach((column, i) => {
      if (column.key === key) {
        const columns = update(this.state.columns, {
          $splice: [[i, 0, column]],
        }) as any;
        this.setState(
          {
            columns,
          },
          () => this.saveVisibleColumnKeysToStorage(columns)
        );
      }
    });
  };

  private startTableLoading = () => {
    this.setState({ tableLoading: true });
  };

  private stopTableLoading = () => {
    this.setState({ tableLoading: false });
  };

  private startSearchButtonLoading = () => {
    this.setState({ searchButtonLoading: true });
  };

  private stopSearchButtonLoading = () => {
    this.setState({ searchButtonLoading: false });
  };

  private tableTitle = (currentPageData: any) => {
    if (this.shouldShowTableTitle) {
      return (
        <Row>
          <Col span={12}>{this.props.title}</Col>
        </Row>
      );
    }
  };

  private accordingly = (dataIndex: string, record: any): any => {
    const indexArr = dataIndex.split('.');
    const key = indexArr.shift() || '';
    const index = indexArr.join('.');
    const subData = record[key] || {};
    const value = record[key] || '';
    return indexArr.length ? this.accordingly(index, subData) : value;
  };

  private renderExpandedRow = (record: any) => {
    const { initialExpands } = this.props;
    const expandTitleStyle: any = {
      textAlign: 'right',
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: 500,
    };
    if (initialExpands) {
      return (
        <Row gutter={16}>
          {initialExpands.map((col, index) => {
            const value = this.accordingly(col.dataIndex, record);
            return (
              <Col key={index} sm={12} md={8} xl={6}>
                <Row gutter={8}>
                  <Col span={8} style={expandTitleStyle}>
                    {col.title}
                  </Col>
                  <Col span={16}>
                    {col.render ? col.render(value, record) : value}
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      );
    }
  };

  render() {
    const rowSelection = Object.assign(
      {},
      {
        selectedRowKeys: this.state.selectedRowKeys,
        onChange: (selectedRowKeys: any, selectedRows: any) => {
          this.setState({
            selectedRowKeys,
            selectedRows,
          });
        },
      },
      this.props.rowSelection
    );

    const RefreshBtn = () => {
      const refresh = () => {
        this.fetch(1);
      };
      return (
        <Col key={'refresh'}>
          <Button onClick={refresh} icon={<RedoOutlined />} />
        </Col>
      );
    };

    const ActionPanel = this.props.plugins && (
      <Row
        className="operationpannel"
        gutter={16}
        style={{ paddingBottom: '1em' }}
      >
        {/* render refresh btn */}
        {this.props.refresh && <RefreshBtn />}
        {this.props.plugins.map((plugin, index) => {
          return (
            <Col key={index} span={plugin.colSpan}>
              {plugin.renderer(
                this.state.selectedRowKeys,
                this.state.selectedRows,
                this.clearSelection
              )}
            </Col>
          );
        })}
        <Col>
          <Row>
            <Col>
              {this.props.enableListSelection && (
                <Dropdown overlay={this.filterPannel} trigger={['click']}>
                  <Button type="default" icon={<EyeOutlined />}>
                    {this.props.listSelectionBtnText}
                  </Button>
                </Dropdown>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    );

    return (
      <div>
        <div>
          {this.props.showSearchFields && (
            <SearchField
              {...this.props}
              fetch={this.fetch}
              btnLoading={this.state.searchButtonLoading}
            />
          )}
        </div>
        <div>
          {this.props.affixTarget ? (
            <Affix
              target={this.props.affixTarget}
              offsetBottom={this.props.affixOffsetBottom}
              offsetTop={this.props.affixOffsetTop}
            >
              {ActionPanel}
            </Affix>
          ) : (
            ActionPanel
          )}
          <Row>
            <Table
              style={{ width: '100%' }}
              bordered
              size="middle"
              {...(this.shouldShowTableTitle && { title: this.tableTitle })}
              rowSelection={rowSelection}
              rowKey={this.props.rowKey}
              loading={this.state.tableLoading}
              columns={this.state.columns}
              dataSource={this.state.data}
              onChange={this.handleChange}
              pagination={this.state.pagination}
              expandedRowRender={
                this.props.initialExpands ? this.renderExpandedRow : undefined
              }
            />
          </Row>
        </div>
      </div>
    );
  }
}

/** Export as default */
export default DataTable;
