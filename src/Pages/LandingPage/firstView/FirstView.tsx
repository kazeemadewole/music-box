/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/button-has-type */
import React from 'react';
import { Button } from 'react-bootstrap';
import style from './firstView.module.css';

const FirstView = () => {
  return (
    <div className={style.firstView}>
      <div className={style.firstViewWrapper}>
        <div className={style.firstViewText}>
          <p>Open the world of music. It’s all here.</p>
        </div>
        <div className={style.firstViewButtonDiv}>
          <Button className={style.firstButton}>MUSICBOX PREMIUM</Button>
          <Button variant='transparent' className={style.secondButton}>
            MUSICBOX FREE
          </Button>
        </div>
        <p className={style.paragraph}>
          1-month free trial <span>$7.99</span>/month after
        </p>
      </div>
    </div>
  );
};

export default FirstView;
