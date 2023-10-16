import React, { useState } from 'react';
import styles from './index.scss';
import { Card } from 'antd';
// import QB_news from './QB_news';
import QB_news2 from './QB_news2';
// import GB_dynamic from './GB_dynamic';
// import YJ_institutions from './YJ_institutions';
// import XJ_dynamics from './XJ_dynamics';
// import ZK_station from './ZK_station';
import Alert from '@assets/images/alerts/alerts_bg.png';

export default function Alerts(props: any) {
  const tabList = [
    {
      key: 'QB_news',
      tab: '全部快讯',
    },
    {
      key: 'GB_dynamic',
      tab: '国别动态',
    },
    {
      key: 'YJ_institutions',
      tab: '研究机构',
    },
    {
      key: 'XJ_dynamics',
      tab: '学界动态',
    },
    {
      key: 'ZK_station',
      tab: '智库驿站',
    },
  ];
  const [eDesc, seteDesc] = useState(true);
  const [edescID, seteDescID] = useState('');

  const [desc, setDesc] = useState(true);
  const [descID, setDescID] = useState('');

  const contentList: Record<string, React.ReactNode> = {
    // QB_news: eDesc ? (
    //   <QB_news
    //     edescID
    //     myevent={(id: any) => {
    //       seteDescID(id);
    //       seteDesc(false);
    //     }}
    //   />
    // ) : (
    //   <QB_news2
    //     edescID={edescID}
    //     edesc
    //     handleBack={() => {
    //       seteDesc(true);
    //     }}
    //   />
    // ),
    // GB_dynamic: <GB_dynamic />,
    // YJ_institutions: <YJ_institutions />,
    // XJ_dynamics: <XJ_dynamics />,
    // ZK_station: <ZK_station />,
  };
  const [activeTabKey1, setActiveTabKey1] = useState<string>('QB_news');

  const onTab1Change = (key: React.SetStateAction<string>) => {
    setActiveTabKey1(key);
  };

  return (
    <div className={styles.AlertsSon}>
      <img className={styles.AlertBgImg} src={Alert} alt="快讯背景图片" />
      <div className={styles.title}>——学术快讯——</div>
      <div className={styles.items}>
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={onTab1Change}
        >
          <div className={styles.contentList}>{contentList[activeTabKey1]}</div>
        </Card>
      </div>
      <div style={{ height: '1100px' }}></div>
    </div>
  );
}
