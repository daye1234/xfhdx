import React,{useState} from 'react'
import styles from './index.scss'
import { Card } from 'antd';
import Leader from './Leader';
import Expert from './Expert';
import ExpertDesc from './ExpertDesc';
import SearchDesc from './SearchDesc';
import SearchTeam from './SearchTeam';
import team from '@assets/images/overview/team.jpg'

export default function Team() {
  const tabList = [
    {
      key: 'leader',
      tab: '中心领导',
    },
    {
      key: 'expert',
      tab: '特聘专家',
    },
    {
      key: 'team',
      tab: '科研团队',
    }
  ];
  const [eDesc,seteDesc] = useState(true)
  const [edescID,seteDescID] = useState('')
  
  const [desc,setDesc] = useState(true)
  const [descID,setDescID] = useState('')

  const contentList: Record<string, React.ReactNode> = {
    leader: <Leader/>,
    expert: eDesc?<Expert edescID myevent={(id:any)=>{seteDescID(id),seteDesc(false)}}/>
    :<ExpertDesc edescID={edescID} edesc handleBack={()=>{seteDesc(true)}}/>,
    
    team: desc?<SearchTeam descID myevent={(id:any)=>{setDescID(id),setDesc(false)}}/>
    :<SearchDesc descID={descID} desc handleBack={()=>{setDesc(true)}}/>,
  };
  const [activeTabKey1, setActiveTabKey1] = useState<string>('leader');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  return (
    <div className={styles.teamSon}>
      <img className={styles.teamBgImg} src={team} />
      <div className={styles.title}>——中心团队——</div>
      <div className={styles.items}>
        <Card
          style={{ width: '100%' }}
          tabList={tabList}
          activeTabKey={activeTabKey1}
          onTabChange={onTab1Change}
        >
          <div className={styles.contentList}>
            {contentList[activeTabKey1]}
          </div>
        </Card>
      </div>
      <div style={{height:'1100px'}}></div>
    </div>
  )
}
