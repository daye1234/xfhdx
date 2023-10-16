import React from 'react'
import styles from './index.scss'
import { Descriptions } from 'antd';
import { Amap, Marker } from '@amap/amap-react';
import contact_bg from '@assets/images/contact/contact_bg.jpg'

export default function Contact() {
  const labelStyle = {
    fontSize: '18px',
    paddingRight:'50px',
    // fontWeight:'bold',
    paddingBottom:'30px'
  }
  const contentStyle = {
    fontSize: '18px',
    color:'#a6b2c3',
    paddingBottom:'30px',
  }
  
  return (
    <div className={styles.contactSon}>
      <img className={styles.contactBgImg} src={contact_bg} />
      <div className={styles.title}>—— 联系我们 ——</div>
      <div style={{height:'1000px'}}>
        <div className={styles.contactBox}>
          <div className={styles.innerTitle}>联系方式</div>
          <Descriptions className={styles.innderDesc} labelStyle={labelStyle} contentStyle={contentStyle}>
            <Descriptions.Item label="电话">159-8476-2973</Descriptions.Item>
            <Descriptions.Item label="邮箱">SHANGHE@XX.COM</Descriptions.Item>
            <br/>
            <Descriptions.Item label="QQ">564981521</Descriptions.Item>
            <Descriptions.Item label="地址">山东省济南市长清区大学路3501号 邮编250353</Descriptions.Item>
          </Descriptions>
          <div className={styles.map}>
            <div style={{ width: '100%', height: '500px' }}>
            <Amap
              mapStyle="amap://styles/normal"
              zoom={15}
              center={[117.07873, 36.663895]}
            >
              <Marker
                position={[117.07873, 36.663895]}
                label={{
                  content: '齐鲁工业大学（山东省科学院）上合区域研究中心',
                  direction: 'right',
                }}
              />
            </Amap>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
