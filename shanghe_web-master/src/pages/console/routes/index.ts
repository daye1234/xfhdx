/*
 * @Author: wangcs
 * @Date: 2021-03-29 11:36:07
 * @LastEditTime: 2021-11-26 18:12:44
 * @LastEditors: wangcs
 * @Description:
 * @FilePath: \supercomputing\src\pages\console\routes\index.ts
 */
/*
 * Created: 2020-03-10 09:07:16
 * Author : Mockingbird
 * Email : 1768385508@qq.com
 * -----
 * Description:
 */
// import { getIndexRoute } from 'utils/router.config'
import { getIndexRoute } from '@utils/router.config';
import Index from '../containers/Home'
import Userpanel from '../containers/Userpanel';
import Contact from '../containers/Contact';
import Message from '../containers/Message';
import MessageDetail from '../containers/Message/MessageDetail';
import Alerts from '../containers/Alerts';
import AlertDetail from '../containers/Alerts/AlertDetail';
import National from '../containers/National';
import NationalDetail from '../containers/National/NationalDetail';
import Infomation from '../containers/Information';
import InfomationDetail from '../containers/Information/InfomationDetail';
import Introduce from '../containers/Introduce';
import Team from '../containers/Team';
import Research from '../containers/Research';
import ResearchDetail from '../containers/Research/ResearchDetail';

export default [
  { path: '/', component: Index, exact: true, title: '首页' },
  { path: '/userpanel', component: Userpanel, exact: true, title: '个人信息' },
  { path: '/contact', component: Contact, exact: true, title: '联系我们' },
  { path: '/message', component: Message,  title: '留言板',exact:true},
  { path: '/message/messageDetail/:id', component: MessageDetail, exact: true, title: '留言板详情' },
  { path: '/alerts', component: Alerts, title: '学术快讯',exact:true},
  { path: '/alerts/alertsDetail/:id/:list_id', component: AlertDetail, exact: true, title: '快讯详情' },
  { path: '/national', component: National, title: '国情纵览' ,exact: true},
  { path: '/national/nationalDetail/:id', component: NationalDetail, exact: true, title: '国情详情' },
  { path: '/infomation', component: Infomation, title: '上合资讯',exact: true},
  { path: '/infomation/infomationDetail/:id/:search', component: InfomationDetail, exact: true, title: '资讯详情' },
  { path: '/introduce', component: Introduce, exact: true, title: '中心介绍' },
  { path: '/team', component: Team, exact: true, title: '中心团队' },
  { path: '/research', component: Research,  title: '科研成果',exact:true}, 
  { path: '/research/researchDetail/:id/:list_id', component: ResearchDetail, exact: true, title: '成果详情' },

  
  
  getIndexRoute({ path: '*', to: '/404', exact: true }),
];
