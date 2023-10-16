import { isEmpty } from 'lodash';
import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import isEqual from 'react-fast-compare';
import { pathToRegexp, compile } from 'path-to-regexp';
import { withTranslation } from 'react-i18next';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as styles from './index.scss';

interface IProps {
  location: any;
  rootStore?: any;
  t?: any;
}

@inject('rootStore')
@observer
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@withTranslation()
class Breadcrumb extends React.Component<RouteComponentProps & IProps> {
  renderBreadcrumb = (pathname: string, t: any): Array<any> => {
    const links: any[] = [];
    pathname.split('/').map((item: string) => {
      links.push(
        <AntdBreadcrumb.Item key={item}>{t(item)}</AntdBreadcrumb.Item>
      );
    });
    return links;
  };

  render() {
    const { t } = this.props;
    const pathname = this.props.location.pathname;
    return (
      <div className={styles.breadcrumb}>
        <AntdBreadcrumb>{this.renderBreadcrumb(pathname, t)}</AntdBreadcrumb>
      </div>
    );
  }
}

export default withRouter(Breadcrumb);
