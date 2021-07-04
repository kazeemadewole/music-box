/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import style from './secondView.module.css';
import PhoneFinder from '../../../assets/Phone-Finder/Phone-Finder.png';
import flowSvg from '../../../assets/FLOW-ICON.svg';

const SecondView = () => {
  return (
    <div className={style.secondView}>
      <div className={style.secondViewWrapper}>
        <div className={style.secondViewImgDiv}>
          <img src={PhoneFinder} alt='Phone-Finder' />
        </div>
        <div className={style.rightSide}>
          <img src={flowSvg} className={style.flowSvg} style={{ float: 'left', marginRight: ' 20px ' }} alt='flow' />
          <h2 className={style.imgH2}>FLOW</h2>

          <p style={{ clear: 'both' }}>
            Listen to a personalized mix of tracks based on your listening history, or create your own mix of genres,
            artists and playlists - letting you enjoy more of the music you love.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondView;
