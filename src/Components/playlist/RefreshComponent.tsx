import React from 'react';
import './PlaylistComponent.css';
// import { Dropdown } from 'react-bootstrap';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const RefreshComponent = () => {
  return (
    <div className='container songHeads'>
      <div className='row'>
        <div className='number'>1</div>
        <div className='title'>Time</div>
        <div className='artist'>Pink Lady</div>
        <div className='ablum'>The Dark side of the moon</div>
        <div className='time'>
          <button type='button'>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default RefreshComponent;
