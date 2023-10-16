import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import introduce from '@assets/images/overview/introduce.jpg';
import axios from 'axios';
import { get_introduce } from '@http/message';

export default function Introduce() {
  const [intro, setIntro]: any = useState([]);
  useEffect(() => {
    axios.get(get_introduce).then((res: any) => {
      console.log(res.data);
      setIntro(res.data.center_intro[0]);
    });
  }, []);
  return (
    <div className={styles.introduceSon}>
      <img className={styles.bgImg} src={introduce} />
      <div className={styles.title}>——中心介绍——</div>
      <div className={styles.inner} dangerouslySetInnerHTML={{ __html: intro.content }}></div>
    </div>
  );
}
