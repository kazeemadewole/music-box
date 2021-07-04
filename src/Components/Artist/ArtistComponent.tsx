import React from 'react';
import './ArtistComponent.css';
import Artsist1 from '../img/artist1.png';
import Artsist2 from '../img/Besty.png';
import Artsist3 from '../img/purple.png';
import Artsist4 from '../img/Queen.png';
// import Artsist5 from '../img/stone.png';
// import Artsist6 from '../img/Bowie.png';
// import { Dropdown } from 'react-bootstrap';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ArtistComponent = () => {
  return (
    <div>
      <div className='container FeachSong'>
        <div className='row'>
          <div className='number'>1</div>
          <div className='imm'>22</div>
          <div className='title'>Bicycle Race</div>
          <div className='artist'>Queen</div>
          <div className='ablum'>Jazz sera</div>
          <div className='time'>
            3.15 <i className='far fa-heart' />
            <i className='fas fa-plus' />
          </div>
        </div>
      </div>
      <div className='container FeachSongSmall'>
        <div className='Artist-page'>
          <p className='letter'>L</p>
          <img src={Artsist1} alt='Artist' />
          <span>Led Zeppelin</span>
        </div>
        <div className='Artist-page'>
          <p className='letter'>Q</p>
          <img src={Artsist4} alt='Artist' />
          <span>Queen</span>
        </div>
        <div className='Artist-page'>
          <p className='letter'>T</p>
          <div style={{ marginBottom: '30px' }}>
            <img src={Artsist4} alt='Artist' />
            <span>The Beatles</span>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <img src={Artsist2} alt='Artist' />
            <span>Taking Head</span>
          </div>
          <div style={{ marginBottom: '30px' }}>
            <img src={Artsist3} alt='Artist' />
            <span>The Clash</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistComponent;
