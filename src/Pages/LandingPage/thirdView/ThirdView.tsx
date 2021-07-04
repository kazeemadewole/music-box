/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import style from './thirdView.module.css';
import image from '../../../assets/Listen-anytime-anywhere/Listen-anytime-anywhere.png';

const ThirdView = () => {
  return (
    <div className={style.thirdView}>
      <div className={style.thirdViewImage}>
        <img src={image} alt='background' />
      </div>
      <div className={style.thirdViewText}>
        <h2>Listen anytime, anywhere</h2>
        <p>All your favorite songs and episodes are always available - even without WiFi or LTE.</p>
      </div>
    </div>
  );
};

export default ThirdView;
