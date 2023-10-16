import * as React from 'react';
import { Button, Form, Row, Col } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
// import { FormComponentProps } from 'antd/lib/form/Form' // tslint:disable-line
import { IDataTableProps, SearchFunc } from './types';
import { FormInstance } from 'antd/lib/form';
const FormItem = Form.Item;

import InputRenderer from './renderer/input';
import SelectRenderer from './renderer/select';
import DatePickerRenderer from './renderer/datePicker';
import TreeSelectRenderer from './renderer/treeSelect';

const comesWithRenderer = {
  input: InputRenderer,
  select: SelectRenderer,
  datePicker: DatePickerRenderer,
  treeSelect: TreeSelectRenderer,
};

/** Your component's props */
export interface ISearchFieldProps extends IDataTableProps {
  /** antd form instance */
  fetch: SearchFunc;
  btnLoading: boolean;
}

/** Your component's state */
export interface ISearchFieldState {
  expand: boolean;
}

/** Your component */
class SearchField extends React.Component<
  ISearchFieldProps,
  ISearchFieldState
> {
  formRef = React.createRef<FormInstance>();
  state = {
    expand: false,
  };

  private shouldHandleCollapse =
    this.props.maxVisibleFieldCount &&
    this.props.searchFields.length > this.props.maxVisibleFieldCount;

  componentDidMount() {
    if (this.props.loadDataImmediately) {
      this.onSearch();
    }
  }
  toggleExpand = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  getFields = () => {
    const { maxVisibleFieldCount, searchFields } = this.props;
    const formItemLayout = {
      wrapperCol: { span: 24 },
    };
    const count = this.state.expand
      ? searchFields.length
      : maxVisibleFieldCount || searchFields.length;
    return this.props.searchFields.map((searchField, i) => {
      const renderComponent = () => {
        if (searchField.renderer) {
          // 自定义 renderer
          return searchField.renderer(searchField.payload);
        } else {
          // 自带 renderer
          if (searchField.type) {
            if (comesWithRenderer[searchField.type]) {
              return comesWithRenderer[searchField.type](searchField.payload);
            } else {
              console.warn('Unknown renderer:', searchField.type);
              return false;
            }
          } else {
            // 既没有 type 又没有 renderer
            console.warn('Renderer or Type should exist in search field');
            return false;
          }
        }
      };
      return (
        <Col
          span={searchField.span || 6}
          key={i}
          style={
            this.shouldHandleCollapse
              ? { display: i < count ? 'block' : 'none' }
              : { display: 'block' }
          }
        >
          <FormItem
            {...formItemLayout}
            label={searchField.label}
            name={searchField.name}
            rules={[searchField.validationRule]}
            // initialValue={[searchField.initialValue]}
          >
            {renderComponent()}
          </FormItem>
        </Col>
      );
    });
  };

  clearField = () => {
    const { resetFields } = this.formRef.current;
    resetFields();
  };

  onSearch = () => {
    const { onValidateFailed, fetch } = this.props;
    const { validateFields } = this.formRef.current;

    validateFields()
      .then((values) => {
        console.warn('验证成功');
      })
      .catch((err) => {
        onValidateFailed && onValidateFailed(err);
        return;
      });
  };

  onFinish = (values: any) => {
    const { fetch } = this.props;
    for (const key in values) {
      if (!values[key]) {
        delete values[key];
      }
    }
    // 从 search field 搜索从第 1 页开始
    fetch(1, values, true);
    console.warn(values);
  };

  render() {
    return (
      <Form
        ref={this.formRef}
        name="control-ref"
        onFinish={this.onFinish}
        className="ant-advanced-search-form"
        style={{ marginBottom: '1em' }}
      >
        <Row gutter={60}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              htmlType="submit"
              type="primary"
              // onClick={this.onSearch}
              loading={this.props.btnLoading}
            >
              {this.props.searchBtnText}
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.clearField}>
              {this.props.clearBtnText}
            </Button>
            {this.shouldHandleCollapse && (
              <a
                style={{ marginLeft: 8, fontSize: 12 }}
                onClick={this.toggleExpand}
              >
                Collapse {this.state.expand ? <UpOutlined /> : <DownOutlined />}
              </a>
            )}
          </Col>
        </Row>
      </Form>
    );
  }
}

/** Export as default */
// export default Form.create(SearchField as any) as any
// export default Form.useForm(SearchField as any) as any
export default SearchField;
