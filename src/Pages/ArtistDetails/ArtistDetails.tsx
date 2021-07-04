/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useState, useContext } from 'react';
import './ArtistDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import {
  faCaretUp,
  faCaretDown,
  faCheckCircle,
  faEllipsisH,
  faHeart,
  faMusic,
  faPlus,
  faSearch,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import playerContext from '../../Contexts/playerContext';
import Navbar from '../../Components/BrowseAndGenreNavbar/BrowseAndGenreNavBar';
import axios from '../../utils/axiosInstance';

const ArtistDetails = (): ReactElement => {
  const [songlists, getSonglist] = useState([]);
  const [artistProfile, getArtistProfile] = useState({});
  const [albums, getAlbums] = useState([]);
  const [fans, getFans] = useState('');
  const { handleClick } = useContext(playerContext);

  useEffect(() => {
    const myData = async () => {
      const songlist = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/artist/${localStorage.getItem('artistId')}/top`
      );
      const albumlist = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/artist/${localStorage.getItem('artistId')}/albums`
      );
      const profile = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/artist/${localStorage.getItem('artistId')}`
      );
      getFans(profile.data.nb_fan);
      getSonglist(songlist.data.data);
      getArtistProfile(profile.data);
      getAlbums(albumlist.data.data);
    };
    myData();
  }, []);

  const Card = (props: { [x: string]: any; details: any }) => {
    const { details, ...others } = props;
    const { shape, hideOverlay, hideTitle, iconType, className } = others;
    return (
      <>
        <div className={`card ${shape || ''} ${className || ''}`}>
          {/* <Link to='/browse'> */}
          <div className='card-image-div flex-row'>
            <img alt='card' src={details.picture || details.cover} className={shape} />
          </div>

          <div className={`card-overlay ${shape} ${hideOverlay}`} />

          <p className={`card-title ${hideTitle}`}>{details.name ? details.name.toUpperCase() : ''}</p>
          <FontAwesomeIcon icon={iconType} className='icon' />
          {/* </Link> */}
        </div>
      </>
    );
  };

  const SubHeader = (): JSX.Element => {
    return (
      <>
        <div className='sub-header flex-row'>
          <Card
            details={artistProfile}
            shape='circle'
            hideOverlay='hide'
            hideTitle='hide'
            iconType={faCheckCircle}
            className='artist-image-div'
          />
          <div className='artist-info-section'>
            <div className='flex-row first-row'>
              <div className='flex-col artist-details'>
                <p className='category'>Artist</p>
                <p className='artist-title'>{localStorage.getItem('artistName')}</p>
              </div>
              <div className='flex-row btn-group'>
                <button type='button' className='shuffle-btn'>
                  SHUFFLE PLAY
                </button>
                <FontAwesomeIcon icon={farHeart} className='icon heart-icon border' />
                <FontAwesomeIcon icon={faEllipsisH} className='icon' />
              </div>
            </div>
            <nav className='flex-row artist-navbar'>
              <li className='active'>OVERVIEW</li>
              <li>ALBUMS</li>
              <div className='followers-div'>
                <span className='followers-count'>{fans}</span>
                <span>FOLLOWERS</span>
              </div>
            </nav>
          </div>
        </div>
      </>
    );
  };

  const generateAlbums = albums.map((element: Record<string, any>) => {
    console.log(element);
    return (
      <div className='card-wrapper flex-col'>
        <Card key={element.id} details={element} hideOverlay='hide' hideTitle='hide' />
        <div className='card-album-details flex-col'>
          <p className='album-name bold'>{element.title}</p>
          <p className='released-date-wrapper'>
            Released: <span className='released-date'>{element.release_date}</span>
          </p>
        </div>
      </div>
    );
  });

  const generateSongs = songlists.map((element: Record<string, any>, index: number) => {
    const durationMinutes = Math.round(element.duration / 60);
    const durationSeconds = element.duration % 60;
    return (
      <div className='flex-row song-div' onClick={() => handleClick(songlists, index)}>
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
        <div className='small-width favorite icon-div'>
          <FontAwesomeIcon icon={farHeart} className='icon like-icon' />{' '}
        </div>
        <div className='small-width more-options icon-div'>
          <FontAwesomeIcon icon={faPlus} className='icon add-icon' />{' '}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className='artist-details-page-wrapper'>
        <Navbar
          urlValue='/artists'
          previousPage={localStorage.getItem('genreName')}
          currentPage={localStorage.getItem('artistName')}
        />
        <div className='artist-details-container flex-col'>
          <div className='div-wrapper'>
            <SubHeader />
            <div className='artist-table-header flex-row'>
              <div className='artist-header-popular-songs-div'>
                <span>Popular songs</span>
              </div>
              <div className='collapse-btn-div'>
                <FontAwesomeIcon icon={faAngleDown} className='icon' />
              </div>
            </div>
            <div className='artist-songs-wrapper flex-col'>
              <div className='flex-row table-header'>
                <div className='small-width'>#</div>
                <div className='small-width' />
                <div className='large-width'>TITLE</div>
                <div className='large-width'>ARTIST</div>
                <div className='large-width'>ALBUM</div>
                <div className='medium-width'>TIME</div>
                <div className='small-width' />
                <div className='small-width' />
              </div>
              {generateSongs}
              <button type='button' className='load-more-btn flex-row'>
                SHOW 5 MORE
              </button>
              <div className='album-section'>
                <div className='sub-header flex-row'>
                  <span>Albums</span>
                </div>
                <div className='card-group'>{generateAlbums}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistDetails;
