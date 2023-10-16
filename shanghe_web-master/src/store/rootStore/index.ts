import { observable, action, makeAutoObservable } from 'mobx';
import { RouterStore } from 'mobx-react-router';
import request from '@utils/request';
import Cookies from 'js-cookie';
import {
  login,
  getUserInfo,
  logout,
  getQuestion,
  getlinks,
} from '@http/apis';
import { INavBar, Ifoot } from './type';
import Base from '../base';
import { find } from 'lodash';
// import { withTranslation } from 'react-i18next/*';
class RootStore {
  base: Base;
  routing: RouterStore;
  userInfo: any;
  navList: INavBar[];
  footList: any[];
  conList: any[];
  constructor() {
    this.base = new Base();
    this.routing = new RouterStore();
    this.userInfo = {};
    this.navList = [
      // {
      //   name: '首页',
      //   link: '/',
      // },
      
      {
        name: '中心概况',
        menu: [
          {
            name: '',
            list: [
              {
                name: '中心介绍',
                link: '/introduce',
              },
              {
                name: '中心团队',
                link: '/team',
              },
              {
                name: '科研成果',
                link: '/research',
              },
            ],
          },
        ],
      },
      {
        name: '上合资讯',
        link: '/infomation',
      },
      {
        name: '国情纵览',
        link: '/national',
      },
      {
        name: '学术快讯',
        link: '/alerts',
      },
      // {
      //   name: '山河算例征集活动',
      //   outerLink: 'https://shanhe.com/activity',
      // },
      {
        name: '留言板',
        link: '/message',
      },
      {
        name: '联系我们',
        link: '/contact',
      },
      // {
      //   name: '科学传播',
      //   link: '/propaganda',
      // },
      // {
      //   name: '超算学院',
      //   link: '/college',
      // },
      // {
      //   name: '新闻动态',
      //   link: '/news',
      // },
      // {
      //   name: '诚聘英才',
      //   link: '/hire',
      // },
    ];

    this.footList = [
      {
        title: '友情链接',
        list: [],
      },
      {
        title: '快速入口',
        list: [
          {
            name: '中心概况',
            link: '/overview',
          },
          {
            name: '中心资源',
            link: '',
          },
          {
            name: '联系我们',
            link: '#',
          },
        ],
      },
      {
        title: '常见问题',
        list: [],
        link: '/question',
      },
      
    ];
    this.conList = [];
    makeAutoObservable(this);
  }
  async fetchInit() {
    // 获取content层级
    // const conList = await this.base.fetchTypeAll();
    // this.changeContent(conList);
    // this.fetchLinks();
    // this.fetchQuestion(this.base.titleId.question_id);
  }
  changeContent(data: any) {
    this.conList = data;
  }
  // 获取常见问题
  async fetchQuestion(id: number) {
    const params = { page_index: 1, page_size: 5, c_type: id };
    const res = await request.get(getQuestion(), { params });
    const data = res.data.content.map((el: any) => {
      return { link: `/details/content/question/${el.id}`, name: el.title };
    });
    this.changeQuestion(data);
  }
  changeQuestion(data: any) {
    this.footList[2].list = data;
  }
  // 获取友情链接
  async fetchLinks() {
    const res = await await request.get(getlinks());
    const data = res.data.links.map((el: any) => {
      return { outerLink: el.href, name: el.title };
    });
    this.changeLinks(data);
  }
  changeLinks(data: any) {
    this.footList[0].list = data;
  }
 

  fetchUserInfo() {
    const user_id = Cookies.get('user_id') || '';
    if (user_id) {
      request.get(getUserInfo(user_id)).then((res) => {
        this.userInfo = res.data;
      });
    } else {
      console.warn('user_id is null');
      this.logout();
    }
  }
  // 登录
  login(params:any){
    return new Promise((resolve,reject)=>{
      request.post(login,params).then((res)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
    
  }
  async logout() {
    await request.get(logout);
  }
}

export default RootStore;
