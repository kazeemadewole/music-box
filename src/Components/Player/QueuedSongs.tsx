/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useContext } from 'react';
import PlayerContext from '../../Contexts/playerContext';
import classes from './Player.module.css';

const Queue = () => {
  const { songs, currentSong } = useContext(PlayerContext);
  const queuedSongs = songs.map((song) => {
    return (
      <div className={classes.queued_songs} key={song.id}>
        <div className={classes.queued_songs_details}>
          <div className={classes.queued_songs_image}>
            <img src={song.album.cover} alt='' />
          </div>
          <div className={classes.queued_songs_title}>
            <div>{song.title}</div>
            <div>
              {song.artist.name} / {song.duration}{' '}
            </div>
          </div>
        </div>
        <div className={classes.queued_songs_bttn}>
          <span className={classes.options}>...</span>
          <span className={classes.remove}>x</span>
        </div>
      </div>
    );
  });
  return (
    <>
      {songs.length > 0 ? (
        <div>
          <div className={classes.queued_songs}>
            <div className={classes.queued_songs_image}>
              <img src={songs[currentSong].album.cover} alt='' />
            </div>
            <div>{songs[currentSong].title}</div>
            <div>
              {songs[currentSong].artist.name} / {songs[currentSong].duration}
            </div>
            <div className={classes.queued_songs_bttn}>
              <span className={classes.options}>...</span>
              <span className={classes.remove}>x</span>
            </div>
          </div>
          <div>
            <span>Next Up</span>
            <span>Shuffle</span>
          </div>
          {queuedSongs}
        </div>
      ) : (
        <p style={{ border: '1px solid red', background: 'blue' }}>No Queued Songs</p>
      )}
    </>
  );
};

export default Queue;
