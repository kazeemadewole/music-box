/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
// import axios from '../../utils/axiosInstance';
import './Album.css';

const AlbumCollection = () => {
  return (
    <>
      <div className='collection'>
        <div className='collect1'>1</div>
        <div className='collect2'>
          <div className='colectDiv1'>Mellion and the Infinite Sadness</div>
          <div className='colectDiv2'>3:52</div>
        </div>
        <div className='collect3'>
          <i className='fas fa-ellipsis-v fa-lg' />
        </div>
      </div>
    </>
  );
};
export default AlbumCollection;
