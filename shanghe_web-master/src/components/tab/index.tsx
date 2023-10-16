/*
 * @Author: wangcs
 * @Date: 2021-04-30 10:03:16
 * @LastEditTime: 2021-07-23 15:18:48
 * @LastEditors: wangcs
 * @Description:
 * @FilePath: \supercomputing\src\components\tab\index.tsx
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
  Sort?: string; // horizontal 横排 ，默认竖排
}
function Tab(props: ITab) {
  const { parentStyle, selected, selStyle, list, handlerClick, Sort } = props;
  const pStyle = Sort === 'horizontal' ? { display: 'flex' } : null;
  return (
    <ul
      className={classNames(styles.Tab)}
      style={{ ...pStyle, ...parentStyle }}
    >
      {list.map((el, index) => (
        <Fragment key={index}>
          <li className={classNames(styles.varLine)}></li>
          <li
            className={classNames(
              styles.tabData,
              selected == el.id ? styles.tabSelected : ''
            )}
            style={selected == el.id ? selStyle : null}
            onClick={() => handlerClick(el.id)}
          >
            <span>{el.title || el.name}</span>
            {selected == el.id && Sort !== 'horizontal' && (
              <div className={styles.kailong}></div>
            )}
            {selected == el.id && Sort === 'horizontal' && (
              <div className={styles.kailong2}></div>
            )}
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
