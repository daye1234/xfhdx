/*
 * Created: 2020-03-09 10:09:27
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description: route
 */
import * as React from 'react';
import Loadable from 'react-loadable';
import BaseLayout from './layouts/Base';
import { Skeleton } from 'antd';
import NotFound from '@components/NotFound';


function Loading() {
  return (
    <div
      style={{
        width: '1000px',
        paddingTop: '60px',
        margin: '0px auto',
      }}
    >
      <Skeleton active />
    </div>
  );
}

const Console = Loadable({
  loader: () => import(/* webpackChunkName: "console" */ '@pages/console/App'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "console" */ '@core/container/login'),
  loading: Loading,
});
const Register = Loadable({
  loader: () => import(/* webpackChunkName: "console" */ '@core/container/register'),
  loading: Loading,
});
export default [
  { path: '/404', component: NotFound, exact: true },
  { path: '/login', component: Login, exact: true, title: '登录' },
  { path: '/register', component: Register, exact: true, title: '注册' },
  {
    component: BaseLayout,
    routes: [
      {
        path: '*',
        component: Console,
      },
    ],
  },
];
