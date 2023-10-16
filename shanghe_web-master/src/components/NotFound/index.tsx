import * as React from 'react';
import classnames from 'classnames';
import * as styles from './index.scss';
import notFound from '@assets/images/notfound/404.png';
import cloud from '@assets/images/notfound/404_cloud.png';
export default function Notfound() {
  return (
    <div className={styles.wscnHttp404Container}>
      <div className={styles.wscnHttp404}>
        <div className={styles.pic404}>
          <img className={styles.pic404Parent} src={notFound} alt="404" />
          <img
            className={classnames(styles.pic404Child, styles.left)}
            src={cloud}
            alt="404"
          />
          <img
            className={classnames(styles.pic404Child, styles.mid)}
            src={cloud}
            alt="404"
          />
          <img
            className={classnames(styles.pic404Child, styles.right)}
            src={cloud}
            alt="404"
          />
        </div>
        <div className={styles.bullshit}>
          <div className={styles.bullshitOops}>糟糕!</div>
          <div className={styles.bullshitHeadline}>页面找不到了...</div>
          <div className={styles.bullshit__info}>
            请检查您输入的网址是否正确，或单击下面的按钮返回主页。
          </div>
          <a href="/" className={styles.bullshitReturnHome}>
            返回主页
          </a>
        </div>
      </div>
    </div>
  );
}
