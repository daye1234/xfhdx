import React, { useEffect, useState } from 'react';
import styles from './index.scss';
import axios from 'axios';
import { Card, Select, Space } from 'antd';
import { LeftCircleFilled,SwapOutlined } from '@ant-design/icons';

export default function NationalDetail(props: any) {
  const [nation, setNation]: any = useState([]);
  useEffect(() => {
    axios
      .get(`/ecos/api_noauth/national_conditions/${props.match.params.id}`)
      .then((res: any) => {
        console.log(res.data);
        setNation(res.data);
      });
  }, [props.match.params.id]);
  const tabList = [
    {
      key: 'country_profile',
      tab: '国家概况',
    },
    {
      key: 'capital',
      tab: '首都城市',
    },
    {
      key: 'administrative_division',
      tab: '行政区划',
    },
    {
      key: 'nation',
      tab: '人口民族',
    },
    {
      key: 'religion',
      tab: '宗教民俗',
    },
    {
      key: 'industry',
      tab: '科技产业',
    },
    {
      key: 'economics',
      tab: '经济贸易',
    },
    {
      key: 'resource',
      tab: '矿产资源',
    },
  ];
  const contentList: Record<string, React.ReactNode> = {
    country_profile: (
      <div dangerouslySetInnerHTML={{ __html: nation.country_profile }} />
    ),
    capital: <div dangerouslySetInnerHTML={{ __html: nation.capital }} />,
    administrative_division: (
      <div
        dangerouslySetInnerHTML={{ __html: nation.administrative_division }}
      />
    ),
    nation: <div dangerouslySetInnerHTML={{ __html: nation.nation }} />,
    religion: <div dangerouslySetInnerHTML={{ __html: nation.religion }} />,
    industry: <div dangerouslySetInnerHTML={{ __html: nation.industry }} />,
    economics: <div dangerouslySetInnerHTML={{ __html: nation.economics }} />,
    resource: <div dangerouslySetInnerHTML={{ __html: nation.resource }} />,
  };
  const [activeTabKey1, setActiveTabKey1] = useState<string>('country_profile');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  const handleBackTo = () => {
    location.href = `/national`;
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setNation(nation.id = value)
    props.match.params.id = value
    
  };
  return (
    <div style={{height:'1500px'}}>
      {nation && (
        <div key={nation.id} className={styles.nationDetSon}>
          <img
            className={styles.bgImg}
            src={'https://jn2.is.shanhe.com/shanghe2/' + nation.backdrop}
          />
          <div className={styles.topBox}>
            <div className={styles.handleBack} onClick={handleBackTo}>
              <LeftCircleFilled
                style={{
                  fontSize: '25px',
                  color: '#edb452',
                  margin: '10px 10px',
                }}
              />
            </div>
            <div>
              <img
                className={styles.nationImg}
                src={'https://jn2.is.shanhe.com/shanghe2/' + nation.backdrop}
              />
            </div>
          </div>
          <Card
            className={styles.card}
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={onTab1Change}
          >
            <div>{contentList[activeTabKey1]}</div>
          </Card>
          <div className={styles.nationName}>——{nation.country_name}——</div>
          <div className={styles.selectNation}>
          <Space wrap>
            <Select
              defaultValue={props.match.params.id == 27 ? '乌兹别克斯坦' : props.match.params.id == 26 
              ? '塔吉克斯坦' : props.match.params.id == 25 ? '哈萨克斯坦' : props.match.params.id == 24
              ? '吉尔吉斯斯坦' : props.match.params.id == 23 ? '巴基斯坦' : props.match.params.id == 22
              ? '印度' : '俄罗斯'}
              style={{ width: 120}}
              onChange={handleChange}
              options={[
                { value: '27', label: '乌兹别克斯坦' },
                { value: '26', label: '塔吉克斯坦' },
                { value: '25', label: '哈萨克斯坦' },
                { value: '24', label: '吉尔吉斯斯坦' },
                { value: '23', label: '巴基斯坦' },
                { value: '22', label: '印度' },
                { value: '21', label: '俄罗斯' },
              ]}
            />
            </Space>
            <SwapOutlined style={{lineHeight:'40px',margin:'0 10px'}} />
            <div style={{lineHeight:'35px'}}>切换国家</div>
          </div>
        </div>
      )}
    </div>
  );
}
