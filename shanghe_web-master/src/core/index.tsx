/*
 * Created: 2020-03-08 17:39:42
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */

import React, { Suspense } from 'react';
import * as ReactDOM from 'react-dom';

import { configure } from 'mobx';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { AppContainer } from 'react-hot-loader';

import { lowVersionBrowser } from '@utils/browserInfo';
// import './../i18n'

// 地图
import { config as AmapReactConfig } from '@amap/amap-react';
AmapReactConfig.version = '2.0'; // 默认2.0，这里可以不修改
AmapReactConfig.key = 'ca2722e2f47ead4f76f0ce10a0f0d6f9';
// AmapReactConfig.plugins = [
//   'AMap.ToolBar',
//   'AMap.MoveAnimation',
//   // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
// ];

import rootStore from '@store/rootStore';
import App from './App';
require('@babel/polyfill');
require('@utils/polyfills');
configure({ enforceActions: 'observed', useProxies: 'never' });
window.globalConfig = JSON.parse(sessionStorage.getItem('config') || '{}');
function Variants() {
  return <div>加载前的loading</div>;
}

// request error handler
window.onunhandledrejection = function (e: any) {
  if (e && (e.status === 'Failure' || e.status >= 400)) {
    if (e.status === 401) {
      // session timeout handler, except app store page.
      console.warn('401');
    }
  }
};
const store = new rootStore();

const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store.routing);

function Container() {
  if (!lowVersionBrowser()) {
    return (
      <div style={{ fontSize: 24 }}>您的浏览器版本过低，请升级后进行访问</div>
    );
  }
  return (
    <AppContainer>
      <Suspense fallback={<Variants></Variants>}>
        <App rootStore={store} history={history} />
      </Suspense>
    </AppContainer>
  );
}
ReactDOM.render(<Container />, document.getElementById('root'));
