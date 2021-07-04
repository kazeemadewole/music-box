/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useState, useContext } from 'react';
import './PlaylistDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faCaretUp, faEllipsisH, faHeart, faMusic, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import playlistPlaceholder from '../../assets/playlist-placeholder.png';
import PlayerContext from '../../Contexts/playerContext';
import Navbar from '../../Components/BrowseAndGenreNavbar/BrowseAndGenreNavBar';

const PlaylistDetails = (): ReactElement => {
  const { handleClick } = useContext(PlayerContext);
  const playlistValues: any = localStorage.getItem('playlistDetails');
  const details = JSON.parse(playlistValues);

  const Card = (props: any) => {
    const { shape, hideOverlay, hideTitle } = props;
    return (
      <>
        <div className={`card ${shape || ''}`}>
          <div className='card-image-div flex-row'>
            <img alt='card' src={details.genre.picture || playlistPlaceholder} className={shape || ''} />
          </div>

          <div className={`card-overlay ${shape || ''} ${hideOverlay || ''}`} />

          <p className={`card-title ${hideTitle || ''}`}>{details.name ? details.name.toUpperCase() : ''}</p>
          <FontAwesomeIcon icon={faMusic} className='icon' />
        </div>
      </>
    );
  };

  const SubHeader = (): JSX.Element => {
    const totalDuration = details.songs.reduce((acc: any, arr: { duration: any }) => {
      return acc + arr.duration;
    }, 0);
    const durationHours = Math.floor(totalDuration / 3600);
    const durationMinutes = Math.floor((totalDuration % 3600) / 60);
    return (
      <div className='sub-header flex-row'>
        <Card />
        <div className='playlist-info-section flex-row'>
          <div className='flex-col playlist-details'>
            <p className='category'>Playlist</p>
            <p className='playlist-title'>{details.name}</p>
            <p className='playlist-info'>{` Lorem ipsum dolor sit amet, consectetuer adipiscing elit. `}</p>
            <div className='playlist-stats flex-row'>
              <span className='total-tracks'>{details.songs.length}</span>
              <span>Songs</span>, <span className='hours-value'> {durationHours}</span>
              <span> hr</span>
              <span className='minutes-value'>{durationMinutes}</span>
              <span> mins</span>
            </div>
          </div>
          <div className='btnGroup-followers-section flex-col'>
            <div className='flex-row btn-group'>
              <button type='button' className='pause-btn'>
                PAUSE
              </button>
              <FontAwesomeIcon icon={farHeart} className='icon' />
              <FontAwesomeIcon icon={faEllipsisH} className='icon' />
            </div>
            <div className='followers-count-div flex-row'>
              <p>
                <span className='followers-count'>{details.likeCount} </span> FOLLOWERS
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const generatePlaylists = () => {
    if (details !== null) {
      const allSongs = details.songs.map((element: Record<string, any>, index: number) => {
        const durationMinutes = Math.floor(element.duration / 60);
        const durationSeconds = element.duration % 60;
        return (
          <div className='flex-row song-div' key={element.id} onClick={() => handleClick(details.songs, index)}>
            <div className='small-width'>{index + 1}</div>
            <div className='small-width song-thumbnail-div'>
              <img className='song-thumbnail' src={element.album.cover} alt='thumbnail' />
            </div>
            <div className='large-width title bold'>{element.title_short}</div>
            <div className='large-width artist bold'>{element.artist.name}</div>
            <div className='large-width album'>{element.album.title}</div>
            <div className='medium-width time'>{`${durationMinutes.toString().padStart(2, '0')} : ${durationSeconds
              .toString()
              .padStart(2, '0')}`}</div>
            <div className='small-width more-options icon-div'>
              <FontAwesomeIcon icon={faEllipsisH} className='icon ellipsis-icon' />{' '}
            </div>
            <div className='small-width favorite icon-div'>
              <FontAwesomeIcon icon={farHeart} className='icon like-icon' />{' '}
            </div>
            <div className='small-width add-to-playlist icon-div'>
              <FontAwesomeIcon icon={faPlus} className='icon add-icon' />{' '}
            </div>
          </div>
        );
      });
      return allSongs;
    }
    return (
      <div className='error-info-div flex-row'>
        <p>No Song Found In The Playlist</p>
      </div>
    );
  };

  return (
    <>
      <div className='playlists-songs-page-wrapper'>
        <Navbar />
        <div className='playlists-songs-container'>
          <div className='div-wrapper'>
            <SubHeader />
            <div className='playlist-table-header flex-row'>
              <div className='playlist-header-search-div'>
                <FontAwesomeIcon icon={faSearch} className='icon' />
                <input type='text' placeholder='Playlist search' />
              </div>
              <div className='filter-section'>
                <span>Playlist songs</span>
                <FontAwesomeIcon icon={faCaretUp} className='icon' />
              </div>
            </div>
            <div className='playlists-songs-wrapper'>
              <div className='flex-row table-header'>
                <div className='small-width'>#</div>
                <div className='small-width' />
                <div className='large-width'>TITLE</div>
                <div className='large-width'>ARTIST</div>
                <div className='large-width'>ALBUM</div>
                <div className='medium-width'>TIME</div>
                <div className='small-width' />
                <div className='small-width' />
                <div className='small-width' />
              </div>
              {generatePlaylists()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistDetails;
