/*
 * Created: 2020-03-09 10:08:08
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:route配置
 */

import * as React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
// import { Switch, Route } from 'react-router'
import { isString, isObject } from 'lodash';
import ScrollToTop from './scrollToTop';

const config = JSON.parse(sessionStorage.getItem('config'));

export const renderRoutes = (
  routes: Array<any>,
  extraProps = {},
  switchProps = {}
) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        const key = route.key || i;
        if (route.redirect) {
          const redirect = route.redirect;

          if (isString(redirect)) return <Redirect key={key} to={redirect} />;

          if (isObject(redirect)) {
            return <Redirect to={''} key={key} {...redirect} />;
          }
        }
        return (
          <Route
            key={key}
            exact={route.exact}
            path={route.path}
            render={(props) => {
              document.title = route.title
                ? `${route.title} - ${config.title}`
                : config.title;

              if (route.render) {
                return route.render(props);
              }
              return (
                <ScrollToTop>
                  <route.component {...props} {...extraProps} route={route} />
                </ScrollToTop>
              );
            }}
            strict={route.strict}
          />
        );
      })}
    </Switch>
  ) : null;

interface IRoute {
  path: string;
  to: string;
  exact: boolean;
  push?: boolean; // 设为时true，重定向会将新条目推入历史记录，而不是替换当前条目。
}

export const getIndexRoute = ({ path, to, ...rest }: IRoute) => ({
  path,
  redirect: {
    from: path,
    to,
    ...rest,
  },
});
