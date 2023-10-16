/*
 * @Author: wangcs
 * @Date: 2021-04-30 10:03:16
 * @LastEditTime: 2022-04-01 09:25:58
 * @LastEditors: wangcs
 * @Description:
 * @FilePath: \supercomputing\src\core\layouts\components\Footer\index.tsx
 */
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import * as styles from './index.scss';
import { LinkOutlined } from '@ant-design/icons';
import Link, { Ilink } from '@components/Link';
import logo from '@assets/images/logo.png';
import qrcode from '@assets/images/logo.png';
import Guide from './containers/guide';
import { useStores } from '@utils/index';
import { useEffect } from 'react';
import LinkBg from '@assets/images/link.png'
import { get_contact } from '@http/message';
import request from '@utils/request'
const LinkStyles = {
  fontSize: 12,
  color: '#8C95A4',
};
function Footer() {
  const [contact, set_contact_intro]: any = useState({})

  const rootStore = useStores('rootStore');
  const linkList = [{
    name: "齐鲁工业大学Qilu University of Technology",
    link: 'https://www.qlu.edu.cn/'
  }, {
    name: "上海合作组织",
    link: 'http://chn.sectsco.org/'
  }]
  const entranceList = [{
    name: "科研成果",
    link: '/research'
  }, {
    name: "上合资讯",
    link: '/infomation'
  }, {
    name: '国情纵览',
    link: '/national'
  }, {
    name: '学术快讯',
    link: '/alerts'

  }, {
    name: '留言板',
    link: '/message'

  }]
  const issueList = [{
    name: "齐鲁工业大学(山东省科学院)",
    link: ''
  }, {
    name: "山东省计算机网络重点实验室",
    link: ''
  }, {
    name: '山东省云计算中心',
    link: ''
  }]
  const getContact = () => {
    request.get(get_contact).then((res: any) => {
      const { data } = res
      const obj = data.contact_info.length ? data.contact_info[0] : {
        addr: "",
        email: ""
      }
      set_contact_intro(obj)
    })
  }
  useEffect(() => {
    // getContact()
  }, [])
  return (
    <>
      <div className={styles.footer}>

        <div className={styles.link_i}>
          <div className={styles.title}>
            <h2>友情链接</h2>
            <img src={LinkBg} alt="" />
          </div>
          <div className={styles.list}>
            {linkList.map((item: any, index: any) => {
              return (
                <div key={index} className={styles.list_i}>
                  <Link data={{ outerLink: item.link }}>
                    <span className={styles.text}>{item.name}</span>
                  </Link>
                </div>
              )
            })}

          </div>

        </div>
        <div className={styles.link_i}>
          <div className={styles.title}>
            <h2>快速入口</h2>
            <img src={LinkBg} alt="" />
          </div>
          <div className={styles.list}>
            {entranceList.map((item: any, index: any) => {
              return (
                <div key={index} className={styles.list_i}>
                  <Link data={{ link: item.link }}>
                    <span className={styles.text}>{item.name}</span>
                  </Link>
                </div>
              )
            })}

          </div>

        </div>
        <div className={styles.link_i}>
          <div className={styles.title}>
            <h2>联系我们</h2>
          </div>
          <div className={styles.list}>

            <img className={styles.img} src='../../../../assets/images/qc-code.jpg'/>
            <div className={styles.list_i}>
              <span className={styles.text}>地址:&nbsp;{contact.addr || ''}
                山东省济南市高新技术开发区新泺大街1768号
              </span>
            </div>
            <div className={styles.list_i}>
              <span className={styles.text}>邮箱:&nbsp;{contact.email || ''}
                service.sdsc@sdas.org
              </span>
            </div>
          </div>

        </div>
        {/* <div className={styles.link_i}>
          <div className={styles.title}>
            <h2>常见问题</h2>
            <img src={LinkBg} alt="" />
          </div>
          <div className={styles.list}>
            {issueList.map((item: any, index: any) => {
              return (
                <div key={index} className={styles.list_i}>
                  <Link data={{ outerLink: '' }}>
                    <span className={styles.text}>{item.name}</span>
                  </Link>
                </div>
              )
            })}

          </div>

        </div> */}
        {/* <div className={styles.dec}>
          <p>
            地址:&nbsp;{contact.addr || ''}
          </p>

          <p>
            邮箱:&nbsp;{contact.email || ''}
          </p>
        </div> */}

      </div>
      <Guide />

    </>
  );
}

export default observer(Footer);
