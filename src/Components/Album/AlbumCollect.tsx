/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
// import axios from '../../utils/axiosInstance';
import './Album.css';

const AlbColl = () => {
  return (
    <div className='Albcoll'>
      <div className='sideHead1'>1</div>
      <div className='sideHead2'>hello Dear</div>
      <div className='sideHead3'>welcome</div>
      <div className='sideHead4'>
        3.456
        <span style={{ marginLeft: '20px', color: '#fff', fontSize: '15px' }}>
          <i className='far fa-heart' />
        </span>
        <span style={{ marginLeft: '15px', color: '#fff', fontSize: '15px' }}>
          <i className='fas fa-plus' />
        </span>
      </div>
    </div>
  );
};
export default AlbColl;
