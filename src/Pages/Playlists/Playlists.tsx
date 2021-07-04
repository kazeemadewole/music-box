/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useState } from 'react';
import './Playlists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import Navbar from '../../Components/BrowseAndGenreNavbar/BrowseAndGenreNavBar';

const Playlists = (): ReactElement => {
  const [playlists, getPlaylists] = useState([]);

  useEffect(() => {
    const myData = async () => {
      const playlistsResult = await axios.get(
        `/api/users/get/playlist?genre=${localStorage.getItem('genreMongoDbId')}`
      );
      getPlaylists(playlistsResult.data.data);
    };
    myData();
  }, []);

  const getPlaylistDetails = (data: Record<string, any>) => {
    localStorage.setItem('playlistDetails', JSON.stringify(data));
  };
  const Card = (props: { [x: string]: any; details: any }) => {
    const { details, ...others } = props;
    const { shape, hideOverlay, hideTitle } = others;
    return (
      <>
        <Link to='playlist-details' onClick={() => getPlaylistDetails(details)}>
          <div className={`card ${shape}`}>
            <div className='card-image-div flex-row'>
              <img alt='card' src={details.genre.picture} className={shape} />
            </div>
            <div className={`card-overlay ${shape} ${hideOverlay}`} />
            <p className={`card-title ${hideTitle}`}>{details.name ? details.name.toUpperCase() : ''}</p>
          </div>
        </Link>
      </>
    );
  };

  const SubHeader = (props: { title: any }) => {
    const { title } = props;
    return (
      <div className='sub-header flex-row'>
        <span>{title}</span>
        <span>...</span>
      </div>
    );
  };

  const generatePlaylists = () => {
    if (playlists.length > 0) {
      return playlists.map((element: Record<string, any>) => {
        return (
          <div className='card-wrapper flex-col'>
            <Card key={element.id} details={element} />
            <div className='card-playlist-details flex-col'>
              <p className='playlist-name'>{element.name}</p>
              <div className='likes-div flex-row'>
                <FontAwesomeIcon icon={faHeart} className='icon' />{' '}
                <span className='likes-count'>{element.likeCount}</span>
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <div className='error-info-div flex-row'>
        <p>No Playlist Found under this Genre</p>
      </div>
    );
  };

  return (
    <>
      <div className='playlists-details-page-wrapper'>
        <Navbar />
        <div className='playlists-details-container'>
          <nav className='flex-row'>
            <p className='playlist-title'>{localStorage.getItem('genreName')}</p>
            <li className='active'>PLAYLISTS</li>
            <li>
              <a href='artists'>ARTISTS</a>
            </li>
          </nav>
          <div className='div-wrapper'>
            <SubHeader title='Popular Playlists' />
            <div className='playlists-wrapper card-group'>{generatePlaylists()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Playlists;
