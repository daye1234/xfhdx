import React, { useState } from 'react';
import { Button, Radio } from 'antd';
import styles from './index.scss';
import bjst from '@assets/images/index/scan/bjst.jpg'

export default function Scholarship() {
  const [current, setCurrent] = useState(0);

  const [placement, SetPlacement] = useState('0');
  const placementChange = (e: any) => {
    SetPlacement(e.target.value);
  };
  const handlerClickTo = () => {
    location.href = `/alerts`;
  };
  return (
    <div className={styles.homeScholarship}>
      <div className={styles.scho_left}>
        <div className={styles.scho_title}>学术快讯</div>
        <div className={styles.scho_desc}>
          一些文字性的描述，没有去掉也可,最好留着。
        </div>
        <Radio.Group
          value={placement}
          onChange={placementChange}
          className={styles.scho_func}
        >
          <Radio.Button
            className={styles.scho_func_item}
            value={'0'}
            onClick={() => {
              setCurrent(0);
            }}
          >
            全部
          </Radio.Button>
          <Radio.Button
            className={styles.scho_func_item}
            value={'1'}
            onClick={() => {
              setCurrent(1);
            }}
          >
            学界动态
          </Radio.Button>
          <Radio.Button
            className={styles.scho_func_item}
            value={'2'}
            onClick={() => {
              setCurrent(2);
            }}
          >
            研究机构
          </Radio.Button>
          <Radio.Button
            className={styles.scho_func_item}
            value={'3'}
            onClick={() => {
              setCurrent(3);
            }}
          >
            国别动态
          </Radio.Button>
          <Radio.Button
            className={styles.scho_func_item}
            value={'4'}
            onClick={() => {
              setCurrent(4);
            }}
          >
            智库驿站
          </Radio.Button>
          <Button className={styles.scho_func_btn} onClick={handlerClickTo}>查看更多</Button>
        </Radio.Group>
      </div>
      <div className={styles.scho_right}>
        {current === 0 && (
          <span>
            <div className={styles.scho_item}>
              <img
                className={styles.item_img}
                src={bjst}
                alt=""
              ></img>
              <div className={styles.item_text}>
                <div className={styles.text_label}>学界动态</div>
                <div className={styles.text_title}>本文章标题一</div>
                <div className={styles.text_desc}>
                  一些关于本文章的详情叙述或者简介,或者说概览,等等
                </div>
              </div>
            </div>
            <div className={styles.scho_item}>
              <img
                className={styles.item_img}
                src={bjst}
                alt=""
              ></img>
              <div className={styles.item_text}>
                <div className={styles.text_label}>研究机构</div>
                <div className={styles.text_title}>本文章标题二</div>
                <div className={styles.text_desc}>
                  一些关于本文章的详情叙述或者简介，或者说概览，等等，一些关于本文章的详情叙述或者简介，或者说概览，等等.....
                </div>
              </div>
            </div>
            <div className={styles.scho_item}>
              <img
                className={styles.item_img}
                src={bjst}
                alt=""
              ></img>
              <div className={styles.item_text}>
                <div className={styles.text_label}>国别动态</div>
                <div className={styles.text_title}>本文章标题三</div>
                <div className={styles.text_desc}>
                  一些关于本文章的详情叙述或者简介,或者说概览,等等
                </div>
              </div>
            </div>
            <div className={styles.scho_item}>
              <img
                className={styles.item_img}
                src={bjst}
                alt=""
              ></img>
              <div className={styles.item_text}>
                <div className={styles.text_label}>国别动态</div>
                <div className={styles.text_title}>本文章标题四</div>
                <div className={styles.text_desc}>
                  一些关于本文章的详情叙述或者简介,或者说概览,等等
                </div>
              </div>
            </div>
          </span>
        )}
        {current === 1 && (
          <span>
            <div className={styles.scho_item}>
              <img
                className={styles.item_img}
                src={bjst}
                alt=""
              ></img>
              <div className={styles.item_text}>
                <div className={styles.text_label}>学界动态</div>
                <div className={styles.text_title}>本文章标题一</div>
                <div className={styles.text_desc}>
                  一些关于本文章的详情叙述或者简介,或者说概览,等等
                </div>
              </div>
            </div>
          </span>
        )}
        {current === 2 && (
          <span>
            <div className={styles.scho_item}>
              <img
                className={styles.item_img}
                src={bjst}
                alt=""
              ></img>
              <div className={styles.item_text}>
                <div className={styles.text_label}>研究机构</div>
                <div className={styles.text_title}>本文章标题二</div>
                <div className={styles.text_desc}>
                  一些关于本文章的详情叙述或者简介，或者说概览，等等，一些关于本文章的详情叙述或者简介，或者说概览，等等.....
                </div>
              </div>
            </div>
          </span>
        )}
        {current === 3 && (
          <span>
            <div className={styles.scho_item}>
              <img
                className={styles.item_img}
                src={bjst}
                alt=""
              ></img>
              <div className={styles.item_text}>
                <div className={styles.text_label}>国别动态</div>
                <div className={styles.text_title}>本文章标题三</div>
                <div className={styles.text_desc}>
                  一些关于本文章的详情叙述或者简介,或者说概览,等等
                </div>
              </div>
            </div>
            <div className={styles.scho_item}>
              <img
                className={styles.item_img}
                src={bjst}
                alt=""
              ></img>
              <div className={styles.item_text}>
                <div className={styles.text_label}>国别动态</div>
                <div className={styles.text_title}>本文章标题四</div>
                <div className={styles.text_desc}>
                  一些关于本文章的详情叙述或者简介,或者说概览,等等
                </div>
              </div>
            </div>
          </span>
        )}
      </div>
    </div>
  );
}
