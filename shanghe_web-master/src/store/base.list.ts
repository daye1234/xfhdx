import { action, makeAutoObservable, observable } from 'mobx';

export default class List {
  data: any[];
  page: number;
  limit: number;
  total: number;
  isLoading: boolean;
  keyword: string;
  more: boolean;
  is_more: boolean;
  filters: any;

  constructor() {
    makeAutoObservable(this);
    this.data = [];
    this.page = 1;
    this.limit = 10;
    this.total = 0;
    this.isLoading = true;
    this.keyword = '';
    this.more = false;
    this.is_more = true;
    this.filters = {};
  }

  update(params: { [x: string]: any }) {
    Object.keys(params).forEach((key) => {
      this[key] = params[key];
    });
  }

  reset() {
    this.update({
      data: [],
      page: 1,
      limit: 10,
      total: 0,
      keyword: '',
      isLoading: false,
      filters: {},
      is_more: false,
    });
  }
}
