/*
 * @Author: wangcs
 * @Date: 2021-03-29 11:36:07
 * @LastEditTime: 2021-09-27 09:14:15
 * @LastEditors: wangcs
 * @Description:
 * @FilePath: \supercomputing\src\core\App.tsx
 */
import { hot } from 'react-hot-loader';
import * as React from 'react';
import { Router } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';
import { renderRoutes } from '../utils/router.config';
import routes from './routes';
import '../i18n';
import '@styles/main.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
// 设置antd中文
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
interface PropType {
  rootStore: any;
  history: any;
}

@hot(module)
@observer
class App extends React.Component<PropType> {
  render() {
    const { rootStore, history } = this.props;
    // 初始化请求接口
    rootStore.fetchInit();
    return (
      <ConfigProvider locale={zhCN}>
        <Provider rootStore={rootStore}>
          <Router history={history}>{renderRoutes(routes)}</Router>
        </Provider>
      </ConfigProvider>
    );
  }
}
export default App;
