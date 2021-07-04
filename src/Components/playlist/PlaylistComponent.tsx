/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './PlaylistComponent.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PlaylistComponent = ({ number, title, artist, album, time, song, handleClick }: any) => {
  return (
    <div onClick={() => handleClick(song, number)}>
      <div className='container songHeads'>
        <div className='row'>
          <div className='number'>{number + 1}</div>
          <div className='title'>{title}</div>
          <div className='artist'>{artist.name}</div>
          <div className='ablum'>{album.title}</div>
          <div className='time'>
            {time} <span>...</span>
          </div>
        </div>
      </div>
      <div className='container songHeadSmall'>
        <div className='imm'>12</div>
        <div className='nana'>{title}</div>
        <div className='dots'>
          <i className='fas fa-ellipsis-v fa-lg' />
        </div>
      </div>
    </div>
  );
};

export default PlaylistComponent;
