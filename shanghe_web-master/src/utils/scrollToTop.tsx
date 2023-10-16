/*
 * Created: 2020-08-05 15:23:11
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */

import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IProps {
  location: any;
}

class ScrollToTop extends React.Component<RouteComponentProps & IProps> {
  componentDidUpdate(prevProps: { location: { pathname: any } }) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
