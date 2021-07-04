/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement, useEffect, useState } from 'react';
import './GenreDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMusic } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import defaultPlaceholder from '../../assets/playlist-placeholder.png';
import axios from '../../utils/axiosInstance';
import Navbar from '../../Components/BrowseAndGenreNavbar/BrowseAndGenreNavBar';

const GenreDetails = (): ReactElement => {
  const [playlists, getPlaylists] = useState([] as Record<string, any>[]);
  const [artists, getArtists] = useState([] as Record<string, any>[]);

  useEffect(() => {
    const myData = async () => {
      const playlistsResult = await axios.get(
        `/api/users/get/playlist?genre=${localStorage.getItem('genreMongoDbId')}`
      );
      // const artistsResult = await axios.get(`/api/users/get/artist?genreID=${localStorage.getItem('genreMongoDbId')}`);

      const artistsResult = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/genre/${localStorage.getItem('genreId')}/artists`
      );

      getArtists(artistsResult.data.data);

      if (playlistsResult.data.data.length === 0) {
        const result: any = [{ status: 'failed' }];
        getPlaylists(result);
      } else {
        getPlaylists(playlistsResult.data.data);
      }
      getArtists(artistsResult.data.data);
    };
    myData();
  }, []);

  const getArtistDetails = (data: any) => {
    localStorage.setItem('artistId', data.id);
    localStorage.setItem('artistName', data.name);
    localStorage.setItem('artistImage', data.picture);
    localStorage.setItem('playlistDetails', JSON.stringify(data));
  };

  const Card = (props: { [x: string]: any; details: any }) => {
    const { details, ...others } = props;
    const { shape, hideOverlay, hideTitle, linkUrl, hideIcon, iconType } = others;

    return (
      <>
        <Link to={linkUrl} onClick={() => getArtistDetails(details)}>
          <div className={`card ${shape || ''}`}>
            <div className='card-image-div flex-row'>
              <img alt='card' src={details.picture || details.genre.picture || defaultPlaceholder} className={shape} />
            </div>
            <div className={`card-overlay ${shape} ${hideOverlay}`} />
            <p className={`card-title ${hideTitle}`}>{details.name ? details.name.toUpperCase() : ''}</p>
            {/* <i className={`icon ${hideIcon} ${iconType}`} /> */}
            <FontAwesomeIcon icon={iconType} className={`icon ${hideIcon}`} />
          </div>
        </Link>
      </>
    );
  };

  const SubHeader = (props: { title: any; link: string }) => {
    const { title, link } = props;
    return (
      <div className='sub-header flex-row'>
        <span>{title}</span>
        <span>
          <Link to={link}>VIEW ALL</Link>
        </span>
      </div>
    );
  };

  const generatePlaylists = playlists.slice(0, 6).map((element: Record<string, any>) => {
    if (!element.status) {
      return (
        <div className='card-wrapper flex-col' key={element.id}>
          <Card details={element} linkUrl='/playlist-details' iconType={faMusic} />
          <div className='card-playlist-details flex-col'>
            <p className='playlist-name'>{element.name}</p>
            <div className='likes-div flex-row'>
              {/* <i className='icon fas fa-heart' /> */}

              <FontAwesomeIcon icon={faHeart} className='icon' />
              <span className='likes-count'>{element.noOfFans || 0}</span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className='error-info-div flex-row'>
        <p>No Playlist Found under this Genre</p>
      </div>
    );
  });

  const generateArtists = artists.slice(0, 6).map((element: Record<string, any>) => {
    return (
      <div className='card-wrapper flex-col' key={element.id}>
        <Card
          details={element}
          shape='circle'
          hideOverlay='hide'
          hideTitle='hide'
          linkUrl='/artist-details'
          hideIcon='hide'
        />
        <div className='card-artist-details flex-col'>
          <p className='artist-name'>{element.name}</p>
          <div className='likes-div flex-row'>
            {/* <i className='icon fas fa-heart' /> */}

            <FontAwesomeIcon icon={faHeart} className='icon' />
            <span className='likes-count'>{element.noOfFans}</span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className='genre-details-page-wrapper'>
        <Navbar urlValue='/browse' previousPage='Genre' currentPage={localStorage.getItem('genreName')} />
        <div className='genre-details-container'>
          <nav className='flex-row'>
            <p className='genre-title'>{localStorage.getItem('genreName')}</p>
            <li className='active'>OVERVIEW</li>
            <li>
              <a href='playlists'>PLAYLISTS</a>
            </li>
            <li>
              <a href='artists'>ARTISTS</a>
            </li>
          </nav>
          <div className='div-wrapper'>
            <SubHeader title='Playlists' link='/playlists' />
            <div className='playlists-wrapper card-group'>
              {generatePlaylists || 'No Playlist Found under this Genre'}
            </div>
          </div>
          <div className='div-wrapper'>
            <SubHeader title='Artists' link='/artists' />
            <div className='artists-wrapper card-group'>{generateArtists}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenreDetails;
