/*
 * @Author: wangcs
 * @Date: 2021-03-29 11:36:07
 * @LastEditTime: 2021-06-30 11:14:24
 * @LastEditors: wangcs
 * @Description:
 * @FilePath: \supercomputing\src\components\pagination\index.tsx
 */
import { Pagination } from 'antd';
import React from 'react';
import styles from './index.scss';
import { observer } from 'mobx-react';
function Page({
  onChange,
  total,
  current,
  pageSize,
}: {
  onChange: any;
  total: number;
  current: number;
  pageSize: number;
}) {
  return (
    <div className={styles.page}>
      {total > 0 && (
        <Pagination
          size="small"
          current={current}
          pageSize={pageSize}
          onChange={onChange}
          total={total}
        />
      )}
    </div>
  );
}
export default Page;
