import React from 'react';
import { Button } from 'antd';
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from './index.scss';
import banner from '@assets/images/index/banner/banner.jpg'

const TopHeader = () => {
  const handlerClickTo = () => {
    location.href = `/introduce`;
  };
  return (
    <div className={styles.homeHeader}>
      <img
        className={styles.bgImg}
        src={banner}
      />
      <div className={styles.header_content}>
        <div className={styles.header_content_title}>
          “共同推进上合组织全面发展”
        </div>
        <div className={styles.header_content_inner}>
          “上海合作组织发展更全面、内涵更丰富、合作更紧密，成为区域组织团结合作、共谋发展的典范。”
          巴基斯坦总理夏巴兹·谢里夫日前在接受本报记者专访时表示，通过上海合作组织成员国元首理事会第
          二十二次会议，巴方将与上合组织其他成员国深化安全、经贸、基础设施、可持续发展等各领域合作，
          期待上合组织为地区和平、稳定、发展作出新的贡献。
        </div>
        <Button className={styles.header_content_btn} type="text" onClick={handlerClickTo}>
          了解更多
          <ArrowRightOutlined/>
        </Button>
      </div>
    </div>
  );
};

export default TopHeader;
