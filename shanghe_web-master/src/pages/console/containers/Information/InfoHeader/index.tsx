import React from 'react';
import { Input } from 'antd';
import styles from './index.scss';
import infomation from '@assets/images/infomation/infomation.jpg';

export default function InfoHeader(props:any) {
  const { Search } = Input;
  const onSearch:any = (value:any, _e:any) => {
    // console.log(value)
    props.sInfo(value)
  };
  return (
    <div className={styles.infoSon}>
      <img className={styles.bgImg} src={infomation} />
      <div className={styles.title}>—— 上合资讯 ——</div>
      <div className={styles.searchBox}>
        <Search
          placeholder="输入关键字,搜索您想要查询的所有的相关资讯..."
          size="large"
          allowClear
          bordered={false}
          onSearch={onSearch}
          className={styles.search}
        />
      </div>
    </div>
  );
}
