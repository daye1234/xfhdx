import React from 'react';
import styles from './index.scss';
import headerBg from '@assets/images/index/logo.png';
import Link from '@components/Link';

function Guide() {
  return (
    <div className={styles.body}>
        <span>Copy Rights 2020 National Supercomputing Center in Jinan</span>
        <Link data={{ link: '/' }}>
        <div className={styles.logo}>
          <img src={headerBg} alt="logo" />
        </div>
      </Link>
    </div>
  );
}

export default Guide;
