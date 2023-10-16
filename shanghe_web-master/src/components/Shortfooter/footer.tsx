import React from 'react';
import * as styles from './style.scss';
import classNames from 'classnames';

interface IProps {
  backcolor: any;
}

function Expofooter(props: IProps) {
  return (
    <div className={styles[props.backcolor]}>
      <div className={classNames(styles.footer)}>
        <div className={classNames(styles.copyright)}>
          Copy&nbsp;Rights&nbsp;2020&nbsp;National&nbsp;Supercomputing&nbsp;Center&nbsp;in&nbsp;Jinan
        </div>
        <div
          style={{
            backgroundImage: "url('assets/images/logowhite.png')",
          }}
          className={classNames(styles.webinfo)}
        >
          <div>
            <p>国家超级计算济南中心</p>
            <p>National&nbsp;Supercomputing&nbsp;Center&nbsp;in&nbsp;Jinan</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expofooter;
