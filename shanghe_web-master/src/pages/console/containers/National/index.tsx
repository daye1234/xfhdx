import React, { useEffect, useState } from 'react';
import styles from './index.scss';
import axios from 'axios';
import { getlist } from '@http/national';

export default function National() {
  const [nation, setNation]: any = useState([]);
  useEffect(() => {
    axios.get(getlist).then((res: any) => {
      console.log(res.data);
      setNation(res.data.national_conditions);
    });
  }, []);
  return (
    <div className={styles.nationSon}>
      <div className={styles.navbar}></div>
      <img
        className={styles.nationBgImg}
        src="../../../assets/images/national/national_bg.jpg"
      />
      <div className={styles.nationCon}>
        <div className={styles.title}>上合组织成员国</div>
        <div className={styles.titleEng}>Shanghe Cooperation Organization</div>
        <div className={styles.nation_items}>
          {nation.map((item: any, key: any) => {
            return (
              <a key={item.id} href={`/national/nationalDetail/${item.id}`} className={styles.nationItem}>
                <div className={styles.nationItem_text}>
                  <div style={{ fontSize: '5px' }}>{item.country_name}</div>
                  <div className={styles.nationItem_textEng}>{item.english_name}</div>
                </div>
                <img
                  className={styles.nationItem_img}
                  src={'https://jn2.is.shanhe.com/shanghe2/' + item.cover}
                  alt=""
                />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
