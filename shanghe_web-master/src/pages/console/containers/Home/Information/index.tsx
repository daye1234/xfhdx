import React from 'react'
import styles from './index.scss'
import info_left from '@assets/images/index/info/info_left.jpg'
import info_center from '@assets/images/index/info/info_center.jpg'
import info_right from '@assets/images/index/info/info_right.jpg'

export default function Information() {
  return (
    <div className={styles.homeInformation}>
        <div className={styles.info}>
            <div className={styles.info_title}>上合资讯</div>
            <div className={styles.info_title_desc}>一些文字性的描述，概括等等,没有去掉也可,最好留着</div>
        </div>
        <div className={styles.infos}>
            <div className={styles.infos_left}>
                <div className={styles.infos_topNew}>
                    <img className={styles.infos_img} src={info_left} alt=''></img>
                    <div className={styles.topNew_title}>美国承认库克群岛为主权国家</div>
                    <div className={styles.topNew_desc}>美国总统拜登(Joe Biden)9月30日在与包括库克群岛总理布朗(Mark Brown)在内的太平洋岛...</div>
                </div>
                <div className={styles.infos_items}>
                    <div className={styles.infos_news}>所罗门群岛外长:需要更长时间来脱离最不发达国家地位</div>
                    <div className={styles.infos_news}>华盛顿峰会落幕美国―太平洋协议重提关键问题</div>
                    <div className={styles.infos_news}>首批援所罗门群岛中国医疗队获当地好评</div>
                    <div className={styles.infos_news}>新西兰与瓦努阿图进博会展品抵沪</div>
                </div>
            </div>
            <div className={styles.infos_center}>
                <img className={styles.infos_center_img} src={info_center} alt=''></img>
                <div className={styles.center_title}>全球变暖之势不可逆图瓦卢总理吁在最坏情况发生时保留国家地位</div>
                <div className={styles.center_desc}>
                    图瓦卢国旗上有九颗黄色的星星，每一颗代表组成这个太平洋小岛的岛屿，
                    这里大约有11000人居住。然而，今天，由于全球气候危机已经造成不可逆
                    转的伤害，其中两个环礁即将被不断上升的海平面吞噬，并可能在未来几十
                    年内使这个国家无法居住....
                </div>
            </div>
            <div className={styles.infos_right}>
                <div className={styles.infos_topNew}>
                    <img className={styles.infos_img} src={info_right} alt=''></img>
                    <div className={styles.topNew_title}>美国承认库克群岛为主权国家</div>
                    <div className={styles.topNew_desc}>美国总统拜登(Joe Biden)9月30日在与包括库克群岛总理布朗(Mark Brown)在内的太平洋岛...</div>
                </div>
                <div className={styles.infos_items}>
                    <div className={styles.infos_news}>所罗门群岛外长:需要更长时间来脱离最不发达国家地位</div>
                    <div className={styles.infos_news}>华盛顿峰会落幕美国―太平洋协议重提关键问题</div>
                    <div className={styles.infos_news}>首批援所罗门群岛中国医疗队获当地好评</div>
                    <div className={styles.infos_news}>新西兰与瓦努阿图进博会展品抵沪</div>
                </div>
            </div>
        </div>
    </div>
  )
}