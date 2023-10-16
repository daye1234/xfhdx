import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import { Pagination } from 'antd';
import axios from 'axios';
import { get_KX2 } from '@http/alerts';

export default function Leader() {
  const [leader, setLeader]: any = useState([]);
  useEffect(() => {
    axios.get(get_KX2).then((res: any) => {
      console.log(res.data);
      setLeader(res.data.team_info);
    });
  }, []);

  const [page, setPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(1);
  const total = leader.length;
  const lastTodoInView = page * todosPerPage;
  const firstTodoInView = lastTodoInView - todosPerPage;
  const todosForDisplay = leader.slice(firstTodoInView, lastTodoInView);
  const handleChange = (pageNumber: any) => {
    setPage(pageNumber);
  };

  return (
    <div className={styles.leaderSon}>
      {todosForDisplay.map((item: any, key: any) => {

        const text = item.intro;
        let matches = text.match(/<p>(.*?)<\/p>/g).map(function (match: any) {
          return match.replace(/&nbsp;|<p>|<\/p>|<\/br>/g, '');
        });

        return (
          <div key={item.id}>
            <div className={styles.center}>
              <img src={'https://jn2.is.shanhe.com/shanghe2/' + item.cover} />
              <div style={{ padding: '30px' }}>
                <div className={styles.bdName}>{item.job_title}</div>
                <div className={styles.name}>{item.name}</div>
                <div className={styles.desc}>{matches[0]}</div>
              </div>
            </div>
          </div>
        );
      })}

      <Pagination
        style={{ marginTop: '30px' }}
        defaultCurrent={1}
        current={page}
        total={total}
        pageSize={todosPerPage} //存储每页上的项目数
        onChange={handleChange}
      />
    </div>
  );
}
