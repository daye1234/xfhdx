import React from 'react';
import styles from './index.scss';
import LoginBg from '@assets/images/login/login.png'
import { useStores } from '@utils/index';

const Layout = ({ children }: { children: any }) => {
  const rootStore = useStores('rootStore');

  const goIndex = () => {
    rootStore.routing.push({ pathname: `/` });

  }
  return (

    <div style={{ backgroundImage: `url(${LoginBg})` }} className={styles.main}>{children}
      <div className={styles.title} onClick={goIndex} style={{ cursor: 'pointer' }}>
        <span>齐鲁工业大学（山东省科学院）上合区域研究中心</span>
        <span>Research Center of SCO countries, Qilu University of Technology (Shandong Academy of Sciences)</span>
      </div>
      <div className={styles.dec}>
        <span>Co pyright 2022 scsc.cn,All rights reserved 齐鲁工业大学(山东省科学院)版权所有</span>
        <span>技术支持:国家超级计算济南中心</span>
      </div>
    </div>
  );
};
export default Layout;
