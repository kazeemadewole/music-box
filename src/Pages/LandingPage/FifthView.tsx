import React from 'react';
import style from './style.module.css';
import facebookLogo from '../../assets/Landing-mobile/Group-1241.png';
import twitterLogo from '../../assets/Landing-mobile/Group-1242.png';
import instagramLogo from '../../assets/Landing-mobile/Group-1243.png';

const FifthView = () => {
  return (
    <div className={style.fifthView}>
      <div className={style.fifthViewBox}>
        <div>
          <p className={style.headerDesign}>
            Music <br /> Box
          </p>
        </div>
        <div>
          <div className={style.footerUl}>
            <div>
              <h6>MUSIC BOX</h6>
              <ul>
                <li>About</li>
                <li>Premium</li>
                <li>Features</li>
              </ul>
            </div>
            <div>
              <h6>COMMUNITIES</h6>
              <ul>
                <li>For Artist</li>
                <li>Developers</li>
                <li>Press</li>
              </ul>
            </div>

            <div>
              <h6>USEFUL LINKS</h6>
              <ul>
                <li>Help</li>
                <li>Web Player</li>
                <li>Explore Channels</li>
                <li>Download App</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.logoDiv}>
          <img src={facebookLogo} alt='facebook-logo' />
          <img src={twitterLogo} alt='twitter-logo' />
          <img src={instagramLogo} alt='instagram-logo' />
        </div>
      </div>
    </div>
  );
};

export default FifthView;
