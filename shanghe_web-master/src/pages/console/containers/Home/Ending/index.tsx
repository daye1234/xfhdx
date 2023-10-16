import React from 'react'
import styles from './index.scss'
import contact from '@assets/images/index/navigater/contact.png'
import board from '@assets/images/index/navigater/board.png'

export default function Ending() {

  const handlerClickToInfo = () => {
    location.href = `/message`;
  };
  const handlerClickToCon = () => {
    location.href = `/contact`;
  };

  return (
    <div className={styles.homeEnding}>
      <div className={styles.end_img}>
          <div className={styles.Info} onClick={handlerClickToInfo}>
            <img style={{marginRight:"30px"}} src={contact} alt=''></img>
            <div className={styles.information}>留言板</div>
          </div>
          
          <div className={styles.Con} onClick={handlerClickToCon}>
            <img  src={board} alt=''></img>
            <div className={styles.contact}>联系我们</div>
          </div>
      </div>
    </div>
  )
}