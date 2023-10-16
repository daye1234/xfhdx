import { action, makeAutoObservable } from 'mobx';
import { find } from 'lodash';
import request from '@utils/request';
import { parent_type, getTypeUrl } from '@http/apis';
export default class BaseStore {
  isSubmitting = true;
  tabList: any[];
  titleId: any;

  constructor() {
    makeAutoObservable(this);

    this.tabList = [];
    this.titleId = {
      filed_id: 53,
      study_id: 40, // 	共性关键技术研究
      question_id: 38, // 常见问题
      expo_id: 37, // 算博会
      appfield_id: 8, // 典型案例
    };
  }
  async fetchParnetType(name: string) {
    // 一级分类
    const result: any = await request.get(parent_type());
    const parent = find(result.data.content_types, (el) => el.name === name);
    return parent.id;
  }

  async fetchType(name?: string) {
    // 一级分类
    const parent_id: any = await this.fetchParnetType(name);
    const params = { parent_id: parent_id };
    // 二级分类
    const data: any = await request.get(getTypeUrl(), {
      params,
    });
    return data.data.content_types;
  }

  async fetchTypeAll() {
    const data: any = await request.get(getTypeUrl(), {});
    const res = data.data.content_types;
    return this.getChildren(res, null);
  }
  getChildren(data: any[], root: number) {
    const children = [];
    for (let i = 0; i < data.length; i++) {
      if (root == data[i].parent_id) {
        data[i].children = this.getChildren(data, data[i].id);
        children.push(data[i]);
      }
    }
    return children;
  }
}
