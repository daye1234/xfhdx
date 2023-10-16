import React, { useState, useEffect, useRef } from 'react';
import { useStores } from '@utils/index';

import National_bg from '@assets/images/national/national_bg.jpg'
import styles from './index.scss'
import request from '@utils/request'
import { getlist } from '@http/national';

const filePath = window.globalConfig.filePath;

const National = ({ route }: any) => {

    const rootStore = useStores('rootStore');
    const [sliderList, setSliderList]: any = useState([])
    const handleSwiper = (item: any) => {
        rootStore.routing.push({ pathname: `/national/nationalDetail/${item.id}` });
    }
    const getList = (page_index?: any) => {


        return new Promise((reslove, reject) => {
            request.get(getlist).then((res: any) => {
                reslove(res)
            })
        })

    }
    const init = () => {
        getList().then((res: any) => {
            if (res.status == 200) {
                setSliderList(res.data.national_conditions)
            }
        })
    }
    useEffect(() => {
        init()
    }, [])
    return <>
        <div className={styles.national} style={{ backgroundImage: `url(${filePath}file/10061b90c29944b5aafeb579f256377.jpg)` }}>
            <div className={styles.nav}></div>
            <div className={styles.box}>
                <h2>上合组织成员国</h2>
                <h3>Shanghai Cooperation Organization</h3>
                <div className={styles.swiper}>
                    {sliderList.map((item: any, index: any) => {
                        return (

                            <div key={index} className={styles.slider} onClick={() => handleSwiper(item)}>
                                <div className={styles.s_l}>
                                    <span>{item.country_name}</span>
                                    <span>{item.english_name}</span>
                                </div>
                                <img src={`${filePath}${item.cover}`} alt="" title={item.country_name} />
                            </div>
                        )
                    })}

                </div>
            </div>

        </div>
    </>
}
export default National