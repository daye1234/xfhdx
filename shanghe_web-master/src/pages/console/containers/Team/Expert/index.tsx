import React, { useState,useEffect } from 'react';
import styles from './index.scss';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Pagination } from 'antd';
import axios from 'axios';
import { get_expert } from '@http/message';

export default function Expert(props:any) {
  const [team, setTeam]: any = useState([]);
  useEffect(() => {
    axios.get(get_expert).then((res: any) => {
      console.log(res.data);
      setTeam(res.data.team_info);
    });
  }, []);

  const [page, setPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(3);

  const lastTodoInView = page * todosPerPage;
  const firstTodoInView = lastTodoInView - todosPerPage;

  const todosForDisplay = team.slice(firstTodoInView, lastTodoInView);

  const handleChange = (pageNumber: any) => {
    setPage(pageNumber)
  };

  const total = team.length
  
  const handleDesc =(id:any) => {
    props.myevent(id)
  }
  return (
    <div className={styles.expertSon}>
      {todosForDisplay.map((item: any, key: any) => {

        const text = item.intro
        let matches = text.match(/<p>(.*?)<\/p>/g).map(function(match:any) {
          return match.replace(/&nbsp;|<p>|<\/p>|<\/br>/g, '');
        });

        return (
          <div className={styles.center} key={item.id}>
            <img className={styles.pImg} src={'https://jn2.is.shanhe.com/shanghe2/' + item.cover} />
            <div style={{ padding: '30px' }}>
              <div className={styles.bdName}>{item.job_title}</div>
              <div className={styles.name}>{item.name}</div>
              <div className={styles.desc}>{matches[0]}</div>
              <a style={{ float: 'right', color: 'blue' }} onClick={()=>{handleDesc(item.id)}}>
                了解更多
                <DoubleRightOutlined />
              </a>
            </div>
          </div>
        );
      })}
      <Pagination
        defaultCurrent={1}
        current={page}
        total={total}
        pageSize={todosPerPage}  //存储每页上的项目数
        onChange={handleChange}
      />
    </div>
  );
}
