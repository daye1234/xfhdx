/*
 * @Author: wangcs
 * @Date: 2021-07-29 12:01:21
 * @LastEditTime: 2021-07-29 12:17:43
 * @LastEditors: wangcs
 * @Description:
 * @FilePath: \supercomputing\src\components\tab2\index.tsx
 */
import classNames from 'classnames';
import React, { Fragment } from 'react';
import styles from './index.scss';
interface ItabList {
  id: number | string;
  title?: string;
  name?: string;
  link?: string;
}
interface Style {
  [propName: string]: string;
}
interface parentStyle {
  [propName: string]: string;
}
interface ITab {
  list: Array<ItabList>;
  selected: number | string;
  selStyle?: Style;
  parentStyle?: Style;
  handlerClick?: (id: any) => any;
}
function Tab(props: ITab) {
  const { parentStyle, selected, selStyle, list, handlerClick } = props;
  const selectedStyle = {
    color: '#1237EF',
    borderBottom: '2px solid #1237EF',
    ...selStyle,
  };
  return (
    <ul className={classNames(styles.Tab)} style={parentStyle}>
      {list.map((el, index) => (
        <Fragment key={index}>
          <li className={classNames(styles.varLine)}></li>
          <li
            className={classNames(styles.tabData)}
            style={selected == el.id ? selectedStyle : null}
            onClick={() => handlerClick(el.id)}
          >
            {el.title || el.name}
          </li>
          {index === list.length - 1 ? (
            <li className={styles.varLine}></li>
          ) : null}
        </Fragment>
      ))}
    </ul>
  );
}
export default Tab;
