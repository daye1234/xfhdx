import { Ilink } from '@components/Link';
export interface INavBar {
  name: string;
  link?: string;
  outerLink?: string;
  menu?: Array<IMenu>;
}
export interface IMenu {
  name: string;
  list: Array<Ilink>;
}

export interface Ifoot {
  link: any;
  title: string;
  list: Ilink[];
}
