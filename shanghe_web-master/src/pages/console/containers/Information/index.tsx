import React, { useState, useEffect } from 'react';
import styles from './index.scss';
import { Pagination, DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import infomation from '@assets/images/infomation/infomation.jpg';
import { getlist } from '@http/infomation';
import axios from 'axios';
import InfoHeader from './InfoHeader';
import { NavLink } from 'react-router-dom';

export default function InfoNews(props: any) {
  const { RangePicker } = DatePicker;
  const [info, setInfo]: any = useState([]);
  useEffect(() => {
    axios.get(getlist).then((res: any) => {
      // console.log(res.data.news);
      setInfo(res.data.news);
    });
  }, []);

  const [page, setPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(3);

  const lastTodoInView = page * todosPerPage;
  const firstTodoInView = lastTodoInView - todosPerPage;

  const todosForDisplay = info.slice(firstTodoInView, lastTodoInView);

  const handleChange = (pageNumber: any) => {
    setPage(pageNumber);
  };
  const total = info.length;

  const [sInfo, setsInfo] = useState('');
  const [searchTerm, setSearchTerm]:any = useState<string[]>(['2000-1-1','2050-1-1']);
  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    setSearchTerm(dateString)
  };
  const time1 = searchTerm[0]
  const time2 = searchTerm[1]
  let time1Num = time1.replace(/-/g, '');
  // console.log(time1Num);
  let time2Num = time2.replace(/-/g, '');
  // console.log(time2Num);
  
  return (
    <div className={styles.infoNews}>
      <InfoHeader
        sInfo={(value: any) => {
          console.log(value);
          setsInfo(value);
        }}
      />
      <div className={styles.infos}>
        <div className={styles.timeSearch}>
          <RangePicker
            style={{ marginRight: '15px' }}
            bordered={false}
            onChange={onChange}
          />
          按时间筛选
        </div>
        {todosForDisplay.map((item: any, key: any) => {
          
          const content = item.title;
          let matches = content.match(sInfo);
          // console.log(matches);

          const time = item.updated_at
          let result = time.substring(0, 10).replace(/-/g, '');
          // console.log(result);

          if (matches && time1Num <= result && result <= time2Num)
            return (
              <NavLink to={`/infomation/infomationDetail/${item.id}/${sInfo ||'zwb_search'}`}
                key={item.id}
              >
                <div className={styles.info_item}>
                  <img className={styles.info_img} src={infomation} />
                  <div className={styles.info_text}>
                    <div className={styles.info_title}>{item.title}</div>
                    <div className={styles.info_desc}>
                      <div style={{ paddingRight: '40px' }}>
                        来源:{item.source}
                      </div>
                      <div>{item.updated_at}</div>
                    </div>
                  </div>
                </div>
              </NavLink>
            );
        })}

        <Pagination
          style={{
            marginTop: '30px',
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '30px',
          }}
          defaultCurrent={1}
          current={page}
          total={total}
          pageSize={todosPerPage} //存储每页上的项目数
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
