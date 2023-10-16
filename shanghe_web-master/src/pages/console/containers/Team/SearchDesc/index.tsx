import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import axios from 'axios';
import { get_team } from '@http/message';
import { LeftCircleFilled } from '@ant-design/icons';

export default function SearchDesc(props: any) {
  // console.log('SearchDesc', props.descID);
  const [descInner, setDescInner]: any = useState([]);
  useEffect(() => {
    axios.get(get_team).then((res: any) => {
      console.log(res.data.team_info);
      setDescInner(res.data.team_info);
    });
  }, []);
  const handleBack = () => {
    // location.href = `/team`;
    // console.log('变成true了')
    props.handleBack()
  };
  return (
    <div className={styles.searchDescSon}>
      <LeftCircleFilled className={styles.back} onClick={()=>{handleBack()}} />
      {descInner.map((item: any, key: any) => {

        const text = item.intro
        let matches = text.match(/<p>(.*?)<\/p>/g).map(function(match:any) {
          return match.replace(/<p>|<\/p>/g, '');
      });
        // console.log(matches);
        
        if (item.id == props.descID)
          return (
            <div key={item.id}>
              <div className={styles.center}>
                <img
                  className={styles.pic}
                  src={'https://jn2.is.shanhe.com/shanghe2/' + item.cover}
                />
                <div style={{ padding: '30px' }}>
                  <div className={styles.bdName}>{item.job_title}</div>
                  <div className={styles.name}>{item.name}</div>
                  <div
                    style={{ marginTop: '60px' }}
                  >{matches[1]}</div>
                </div>
              </div>

              <div
                style={{ marginTop: '60px' }}
                dangerouslySetInnerHTML={{ __html: item.intro }}
              ></div>
            </div>
          );
      })}
    </div>
  );
}
