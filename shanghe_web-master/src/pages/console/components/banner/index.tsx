/*
 * @Author: wangcs
 * @Date: 2021-04-30 10:03:16
 * @LastEditTime: 2021-09-23 11:14:54
 * @LastEditors: wangcs
 * @Description:
 * @FilePath: \supercomputing\src\pages\console\components\banner\index.tsx
 */



import * as React from 'react';
import * as styles from './index.scss';
const Banner=({src,title}:any)=>{
  return <>
  <div className={styles.banner} style={{backgroundImage:`url(${src})`}}>
   <div className={styles.dec}>
   <span>——</span>
    <span>{title}</span>
    <span>——</span>
   </div>
  </div>
  </>
}

export default Banner;
