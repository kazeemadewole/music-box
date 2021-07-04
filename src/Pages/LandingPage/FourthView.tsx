/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import style from './style.module.css';
import searchPhone from '../../assets/Search-Phone/Search-Phone.png';
import noAds from '../../assets/Landing/NoADS.png';
import offline from '../../assets/Landing/Offline.png';
import unlimSkips from '../../assets/Landing/UnlimSkips.png';
import HQ from '../../assets/Landing/HQ.png';

const FourthView = () => {
  return (
    <div className={style.fourthView}>
      <div className={style.fourthViewDiv}>
        <div className={style.fourthViewLeft}>
          <h2>Find the music you want</h2>
          <p>
            Search for your favorite songs using the description, or turn on the <span>MusicFinder</span> feature to
            find the song that is playing near you.
          </p>
        </div>

        <div className={style.fourthViewRight}>
          <img src={searchPhone} alt='phone' />
        </div>
      </div>

      <div className={style.fourthViewPremium}>
        <h2>Why go Premium?</h2>
        <div className={style.fourthViewIcons}>
          <div className={style.fourthViewIconDivs}>
            <img className={style.imgWrapperimg} src={offline} alt='offline' />

            <div className={style.displayText}>
              <h2>Offline mode.</h2>
              <p>Save and listen anywhere.</p>
            </div>
          </div>

          <div className={style.fourthViewIconDivs}>
            <img className={style.imgWrapperimg} src={HQ} alt='HQ' />
            <div className={style.displayText}>
              <h2>High quality audio.</h2>
              <p>Enjoy the full range of sound.</p>
            </div>
          </div>

          <div className={style.fourthViewIconDivs}>
            <img className={style.imgWrapperimg} src={noAds} alt='no-ads' />
            <div className={style.displayText}>
              <h2>No ads.</h2>
              <p>Enjoy nonstop music.</p>
            </div>
          </div>

          <div className={style.fourthViewIconDivs}>
            <img className={style.imgWrapperimg} src={unlimSkips} alt='unlimSkips' />
            <div className={style.displayText}>
              <h2>Unlimited skips.</h2>
              <p>Just tap skip.</p>
            </div>
          </div>
        </div>

        <p className={style.fourthViewParagraph}>Listen free or subscribe to MusicBox Premium.</p>
        <div className={style.fourthViewBox}>
          <div className={style.viewAndButtonBox}>
            <div className={style.fourthViewFirstBox}>
              <h3>MusicBox Free</h3>
              <p>
                <span>$0.00</span>/month
              </p>

              <ul>
                <li>Online listening</li>
                <li>Regular audio</li>
                <li>With advertising</li>
                <li>30 skips per day</li>
              </ul>
            </div>
            <Button variant='transparent' className={style.secondButton}>
              GET MUSICBOX FREE
            </Button>
          </div>

          <div className={style.viewAndButtonBox}>
            <div className={style.fourthViewSecondBox}>
              <h3>MusicBox Premium</h3>
              <p>
                <span>$7.99</span>/month
              </p>
              <p>Start with 1-month free trial*</p>

              <ul>
                <li>Offline mode</li>
                <li>High quality audio</li>
                <li>No ads</li>
                <li>Unlimited skips</li>
              </ul>
            </div>
            <Button className={style.firstButton}>GET MUSICBOX PREMIUM</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthView;
