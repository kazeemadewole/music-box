import React from 'react';
import './Featured.css';
import Artsist1 from '../img/artist1.png';
import Artsist2 from '../img/Besty.png';
import Artsist3 from '../img/purple.png';
import Artsist4 from '../img/Queen.png';
import Artsist5 from '../img/stone.png';
import Artsist6 from '../img/Bowie.png';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const FeaturedArtist = () => {
  return (
    <div className='container ArtistImage'>
      <div className='each-image'>
        <img className='artImg' src={Artsist1} alt='Artist' />
      </div>
      <div className='each-image'>
        <img className='artImg' src={Artsist2} alt='Artist' />
      </div>
      <div className='each-image'>
        <img className='artImg' src={Artsist3} alt='Artist' />
      </div>
      <div className='each-image'>
        <img className='artImg' src={Artsist4} alt='Artist' />
      </div>
      <div className='each-image'>
        <img className='artImg' src={Artsist5} alt='Artist' />
      </div>
      <div className='each-image'>
        <img className='artImg' src={Artsist6} alt='Artist' />
      </div>
    </div>
  );
};

export default FeaturedArtist;
