import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import { Pagination } from 'antd';
import axios from 'axios';
import { get_leader } from '@http/message';

export default function Leader() {
  const [leader, setLeader]: any = useState([]);
  useEffect(() => {
    axios.get(get_leader).then((res: any) => {
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

            <div className={styles.anoTitle}>工作经历</div>
            <div className={styles.desc}>
              2017 年 1 月至 2018 年 8 月，任山东省计算中心主任；
            </div>
            <div className={styles.desc}>
              2018 年 8 月至 2021 年 10
              月，同时任齐鲁工业大学网络空间安全学院院长， 其间 2019 年 2 月至
              2021 年 4 月挂职山东省科协副主席；
            </div>
            <div className={styles.desc}>
              2021 年 10 月至 2022 年 3
              月，任齐鲁工业大学（山东省科学院）计算机科学
              与技术学部主任，计算机科学与技术学院院长、网络空间安全学院院长、省计算中心主任；
            </div>
            <div className={styles.desc}>
              2022 年 3
              月起任齐鲁工业大学（山东省科学院）副校长（副院长）。负责科学
              研究、成果转化、信息化建设工作；分管科研管理部、科技合作与成果转化处、社科处（智库中心）、网络信息中心。
              联系计算机科学与技术学部、山东保密学院、数学与人工智能学部、高新技术产业（中试）基地、前沿交叉学科研究
              院、大数据研究院、山东山科控股集团有限公司。
            </div>

            <div className={styles.anoTitle}>研究成果</div>
            <div className={styles.desc}>
              在超级计算领域，先后主持多项国家重点研发计划课题及任务，特别是在大规模稀
              疏矩阵直接求解器方面取得突破，首次实现了基于国产超算的十万核量级异构众核并行，算法速度提升，得到该领域专
              家高度评价，技术已在海洋、电磁、航空航天等领域进行了应用。在异构资源管理与调度优化方面的研究成果也取得突
              出成绩，主导开展基于国产超算的软件应用生态系统研发。在云计算领域，主持和参与国家和省部级各类重大项目多项，
              突破跨区域资源统一管理与调度、数据存储访问等技术，研发了具有自主知识产权的“泉云”云计算和大数据系列软件，
              已经在省市政务云中大规模应用。在软件测评领域，主持构建了软件测试规范体系，突破了高效测试用例自动生成、基
              于功能点的软件成本度量等技术，研发多种工具软件。接求解器方面取得突破，首次实现了基于国产超算的十万核量级
              异构众核并行，算法速度提升，得到该领域专家高度评价，技术已在海洋、电磁、航空航天等领域进行了应用。在异构
              资源管理与调度优化方面的研究成果也取得突出成绩，主导开展基于国产超算的软件应用生态系统研发。在云计算领域
              ，主持和参与国家和省部级各类重大项目多项，突破跨区域资源统一管理与调度、数据存储访问等技术，研发了具有自
              主知识产权的“泉云”云计算和大数据系列软件，已经在省市政务云中大规模应用。在软件测评领域，主持构建了软件测
              试规范体系，突破了高效测试用例自动生成、基于功能点的软件成本度量等技术，研发多种工具软件。
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
