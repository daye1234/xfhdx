import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import styles from './index.scss';
import axios from 'axios';
import title_bg from '@assets/images/index/scan/title_bg.png'
import { getlist } from '@http/national';

export default function Nation() {
  const [nation, setNation]: any = useState([]);
  useEffect(() => {
    axios
      .get(getlist)
      .then((res: any) => {
        console.log(res.data);
        setNation(res.data.national_conditions);
      });
  }, []);
  return (
    <div className={styles.homeNation}>
      <img
        className={styles.bgImg}
        src={title_bg}
      />
      <div className={styles.nation_top}>
        <div className={styles.nation_title}>国情纵览</div>
        <div className={styles.nation_desc}>
          一些文字性的描述，概括等等，没有去掉也可，最好留着
        </div>
      </div>

      <div className={styles.swiper}>
        <Carousel
          dots={false}
          autoplay
          slidesToShow={4}
          slidesToScroll={1}
          speed={3000}
          autoplaySpeed={3000}
          cssEase="linear"
          variableWidth
          adaptiveHeight
        >
          {nation.map((item: any, key: any) => {
            return (
              <a key={item.id} href={`/national/nationalDetail/${item.id}`}>
              <div>
                <div className={styles.swiper_item}>
                  <div className={styles.swiper_item_text}>
                    <div style={{ fontSize: '16px' }}>{item.country_name}</div>
                    <div className={styles.swiper_item_textEng}>
                      {item.english_name}
                    </div>
                  </div>
                  <img
                    className={styles.nation_swiper}
                    src={'https://jn2.is.shanhe.com/shanghe2/' + item.cover}
                    alt=""
                  />
                </div>
              </div>
              </a>
            );
          })}
        </Carousel>
      </div>
      <div className={styles.btm}></div>
    </div>
  );
}
