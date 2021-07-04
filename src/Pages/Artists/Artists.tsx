/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useEffect, useState } from 'react';
import './Artists.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faHeart } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import Navbar from '../../Components/BrowseAndGenreNavbar/BrowseAndGenreNavBar';
import axios from '../../utils/axiosInstance';

const Artists = (): ReactElement => {
  const [artists, getArtists] = useState([]);

  useEffect(() => {
    const myData = async () => {
      const artistsResult = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/genre/${localStorage.getItem('genreId')}/artists`
      );

      const resultArray: any = [];
      artistsResult.data.data.map(async (element: Record<string, any>) => {
        const noOfFollowers = await axios.get(
          `https://thingproxy.freeboard.io/fetch/https://api.deezer.com/artist/${element.id}`
        );
        const newResult = { ...element };
        newResult.noOfFans = noOfFollowers.data.nb_fan;
        resultArray.push(newResult);
      });
      getArtists(artistsResult.data.data);
      setTimeout(() => {
        getArtists(resultArray);
      }, 3000);
    };
    myData();
  }, []);

  const getArtistDetails = (data: any) => {
    localStorage.setItem('artistId', data.id);
    localStorage.setItem('artistName', data.name);
    localStorage.setItem('artistImage', data.picture);
  };

  const Card = (props: { [x: string]: any; details: any }) => {
    const { details, ...others } = props;
    const { shape, hideOverlay, hideTitle, linkUrl } = others;

    return (
      <>
        <Link to={linkUrl} onClick={() => getArtistDetails(details)}>
          <div className={`card ${shape}`}>
            <div className='card-image-div flex-row'>
              <img alt='card' src={details.picture} className={shape} />
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
        <span>
          <FontAwesomeIcon icon={faEllipsisH} className='icon' />
        </span>
      </div>
    );
  };

  const generateArtists = artists.map((element: Record<string, any>) => {
    return (
      <div className='card-wrapper flex-col' key={element.id}>
        <Card
          details={element}
          hideOverlay='hide'
          shape='circle'
          hideTitle='hide'
          linkUrl='/artist-details'
          hideIcon='hide'
        />
        <div className='card-artist-details flex-col'>
          <p className='artist-name'>{element.name}</p>
          <div className='likes-div flex-row'>
            <FontAwesomeIcon icon={faHeart} className='icon' />
            <span className='likes-count'>{element.noOfFans}</span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className='artists-container-page-wrapper'>
        <Navbar urlValue='/genre-details' previousPage={localStorage.getItem('genreName')} currentPage='Artists' />
        <div className='artists-container'>
          <nav className='flex-row'>
            <p className='artist-title'>{localStorage.getItem('genreName')}</p>
            <li className='active'>OVERVIEW</li>
            <li>
              <a href='playlists'>PLAYLISTS</a>
            </li>
            <li className=''>
              <a href='artists'>ARTISTS</a>
            </li>
          </nav>
          <div className='div-wrapper'>
            <SubHeader title='Popular Artists' />
            <div className='artists-wrapper card-group'>{generateArtists}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Artists;
