import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import axios from 'axios';
import { message } from 'antd';
import {
  LeftCircleFilled,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { getdetail } from '@http/infomation';
import InfoHeader from '../InfoHeader';
import { NavLink } from 'react-router-dom';
import { getpreOrnext } from '@http/infomation';

export default function InfomationDetail(props: any) {
  const [descInner, setDescInner]: any = useState([]);
  const [preOrnext, setPreOrnext]: any = useState([]);
  useEffect(() => {
    axios.get(`${getdetail}/${props.match.params.id}`).then((res: any) => {
      setDescInner(res.data);
    });
    axios
      .get(`${getpreOrnext}?id=${props.match.params.id}`)
      .then((res: any) => {
        setPreOrnext(res.data.data);
      });
  }, [props.match.params.id]);

  const pre = `/infomation/infomationDetail/${preOrnext.previous_id}/zwb_search`;
  const next = `/infomation/infomationDetail/${preOrnext.next_id}/zwb_search`;

  const handlePre = () => {
    if(preOrnext.previous_title){props.history.push(pre)}
    else{
      message.warning('没有上一页了')
    }
  }
  const handleNext = () => {
    if(preOrnext.next_id){props.history.push(next)}
    else{
      message.warning('没有下一页了')
    }
  }
  
  const [sInfo, setsInfo] = useState('');
  return (
    <div className={styles.infoDetail}>
      <InfoHeader 
        sInfo={(value: any) => {
          console.log(value);
          setsInfo(value);
        }}
        />
      <NavLink to="/infomation">
        <LeftCircleFilled className={styles.back} />
      </NavLink>
      <div className={styles.contect}>
        <div className={styles.title}>{descInner.title}</div>
        <div className={styles.time}>
          <p>发布时间：{descInner.updated_at}</p>
          <p>信息来源：{descInner.source}</p>
        </div>
        <div className={styles.newsDesc}>{descInner.content}</div>
      </div>
      <div className={styles.selectInfo}>
        <div className={styles.handle} onClick={handlePre}>
          <ArrowLeftOutlined style={{marginRight:'20px'}} />
          上一篇：{preOrnext.previous_title}
        </div>
        <div className={styles.handle} onClick={handleNext}>
          <ArrowRightOutlined style={{marginRight:'20px'}} />
          下一篇：{preOrnext.next_title}
        </div>
      </div>
    </div>
  );
}
