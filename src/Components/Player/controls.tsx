/* eslint-disable no-self-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef, useContext } from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeMuteIcon from '@material-ui/icons/VolumeMute';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddIcon from '@material-ui/icons/Add';
import playerContext from '../../Contexts/playerContext';
import Queue from './QueuedSongs';
import UserPlaylist from './userPlaylst';
import classes from './Player.module.css';

function Controls() {
  // Global State
  const {
    currentSong,
    songs,
    nextSong,
    prevSong,
    repeat,
    random,
    playing,
    toggleRandom,
    toggleRepeat,
    togglePlaying,
    handleEnd,
  } = useContext(playerContext);

  const audio: React.LegacyRef<HTMLAudioElement | undefined> = useRef();

  // self State
  const [statevolum, setStateVolum] = useState(0.3);
  const [dur, setDur] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [modalView, setModalView] = useState(false);
  const [playlistView, setPlaylistView] = useState(false);

  const fmtMSS = (s: any) => {
    return (s - (s %= 60)) / 60 + (s > 9 ? ':' : ':0') + ~~s;
  };

  const toggleAudio = () => {
    if (audio.current) {
      return audio.current.paused ? audio.current.play() : audio.current.pause();
    }
  };

  const handleVolume = (q: any) => {
    setStateVolum(q);
    if (audio.current) {
      audio.current.volume = q;
    }
  };

  const toggleModal = () => {
    setModalView(!modalView);
  };

  const togglePlaylist = () => {
    setPlaylistView(!playlistView);
  };

  const handleProgress = (e: any) => {
    const compute = (e.target.value * dur) / 100;
    setCurrentTime(compute);
    if (audio.current) {
      audio.current.currentTime = compute;
    }
  };

  useEffect(() => {
    if (audio.current) {
      audio.current.volume = statevolum;
    }
    if (playing) {
      toggleAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, songs]);

  let volumeIcon = <VolumeMuteIcon />;
  if (audio.current) {
    if (audio.current.volume > 0.5) {
      volumeIcon = <VolumeUpIcon />;
    } else if (audio.current.volume <= 0.5 && audio.current.volume > 0) {
      volumeIcon = <VolumeDownIcon />;
    } else {
      volumeIcon = volumeIcon;
    }
  }

  const currentPercentage = dur ? `${(currentTime / dur) * 100}%` : '0%';
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #731bd8), color-stop(${currentPercentage}, #fff))
`;

  return (
    <>
      <div>
        {modalView && (
          <div className={classes.queued_songs_div}>
            <Queue />
          </div>
        )}
      </div>

      <div className={classes.controls_wrapper}>
        <div className={classes.controls}>
          <div className={classes.audio_hero}>
            <audio
              onTimeUpdate={(e: React.BaseSyntheticEvent) => setCurrentTime(Number(e.currentTarget.currentTime))}
              onCanPlay={(e: React.BaseSyntheticEvent) => setDur(Number(e.currentTarget.duration))}
              onEnded={handleEnd}
              ref={audio as React.LegacyRef<HTMLAudioElement>}
              preload='true'
              loop={repeat}
              src={songs[currentSong]?.preview}
            />
            <div className={classes.start}>
              <div className={classes.img}>
                <img src={songs[currentSong]?.album.cover} alt='' />
              </div>
              <div className={classes.songtext}>
                <p className={classes.song_title}>{songs[currentSong]?.title}</p>
                <p className={classes.artistname}>{songs[currentSong]?.artist.name}</p>
              </div>
              <div>
                <FavoriteBorderIcon className={`${classes.bttn} ${classes.fav_bttn}`} />
              </div>
              {playlistView && <UserPlaylist />}
              <div onClick={togglePlaylist}>
                <AddIcon className={classes.bttn} />
              </div>
            </div>
          </div>
          <div className={classes.middle}>
            <div className={classes.controllers}>
              <div onClick={toggleRandom} className={classes.shuffle_bttn}>
                <ShuffleIcon
                  className={random ? `${classes.bttn__green} ${classes.margin}` : `${classes.bttn} ${classes.margin}`}
                />
              </div>
              <div className={classes.prev} onClick={prevSong}>
                <SkipPreviousIcon className={`${classes.bttn} ${classes.margin}`} />
              </div>
              <div
                className={classes.play}
                onClick={() => {
                  togglePlaying();
                  toggleAudio();
                }}
              >
                {!playing ? (
                  <PlayCircleOutlineIcon className={`${classes.bttn}  ${classes.margin}`} />
                ) : (
                  <PauseCircleOutlineIcon className={`${classes.bttn}  ${classes.margin}`} />
                )}
              </div>

              <div className={classes.next} onClick={nextSong}>
                <SkipNextIcon className={`${classes.bttn}  ${classes.margin}`} />
              </div>
              <div onClick={toggleRepeat} className={classes.repeat_bttn}>
                <RepeatIcon className={repeat ? `${classes.bttn__green}` : `${classes.bttn}`} />
              </div>
            </div>
            <div className={classes.progressbar}>
              <div className={classes.currentTime}>{fmtMSS(currentTime)}</div>
              <input
                className={`${classes.playerInput} ${classes.input}`}
                onChange={handleProgress}
                value={dur ? (currentTime * 100) / dur : 0}
                type='range'
                name='progresBar'
                id='prgbar'
                style={{ background: trackStyling, width: '100%' }}
              />
              <div className={classes.totalTime}>{fmtMSS(dur)}</div>
            </div>
          </div>
          <div className={classes.end}>
            <div className={classes.volum}>
              <div className={classes.icons}>{volumeIcon}</div>
              <div className={classes.icons}>
                <input
                  className={classes.input}
                  value={Math.round(statevolum * 100)}
                  type='range'
                  name='volBar'
                  id='volBar'
                  onChange={(e) => handleVolume(Number(e.target.value) / 100)}
                />
              </div>
            </div>

            <div className={classes.playlist_bttn} onClick={toggleModal}>
              <PlaylistPlayIcon className={classes.bttn} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Controls;
