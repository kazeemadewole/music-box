/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import cardImage from '../img/Album.png';
import cardAlb1 from '../img/album1.png';
import cardAlb2 from '../img/album2.png';
import AlbumCollection from './AlbumCollection';
import AlbColl from './AlbumCollect';
import axios from '../../utils/axiosInstance';
import './Album.css';

const Album = () => {
  const { id }: Record<string, any> = useParams();
  const userAlbum = async () => {
    const tokenValue = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    };
    try {
      const { data } = await axios.get(`https://api.deezer.com/album/${id}/tracks`);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    userAlbum();
  }, []);
  const firstname = localStorage.getItem('firstname');
  return (
    <div className='containers bagg3'>
      <div className='biggy-Alb'>
        <div className='one'>
          <div className='logo'>Logo</div>
          <div className='links'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/artist'>Library</Link>
              </li>
              <li className='lib'>Browse.</li>
              <li>
                The Smashing /<span> Mellon Collie</span>
              </li>
            </ul>
          </div>
        </div>
        <div className='two'>
          <div className='search'>
            <div className='icon'>
              <span className='fas fa-search searchMe' />
              <input className='searchNow' placeholder='Search' />
            </div>
          </div>
          <div className='profile'>
            <div className='prof'>
              <span className='fas fa-user-circle' />
            </div>
            <div className='checkUser'>
              <Dropdown>
                <Dropdown.Toggle
                  variant='secondary'
                  id='dropdown-basic'
                  style={{ color: 'white', backgroundColor: 'transparent', border: 'none', outline: 'none' }}
                >
                  {firstname}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                  <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                  <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
      <div className='smally-Alb'>
        <div className='lastone'>
          <li>
            <i className='fas fa-arrow-left' />
          </li>
        </div>
        <div className='lasttwo'>
          <div className=''>
            <i className='fa fa-share-alt' aria-hidden='true' />
            <i className='fas fa-ellipsis-v fa-lg' />
          </div>
        </div>
      </div>
      <div className='container RockArtist'>
        <div className='row'>
          <div className='cardNow'>
            <img src={cardImage} className='card-img-top' style={{ height: '100%', width: '100%' }} alt='...' />
          </div>
          <div className='playTitle'>
            <p>playlist</p>
            <h5>70s Rock Anthems</h5>
            <p className='no'>Golden age of rock, Coverr lead Zeppelin</p>
            <p className='nodate'>88 Song, 9 hr 13 min</p>
          </div>
          <div className='rare'>
            <div className='shuffle'>
              <button type='button'>PAUSE</button>
            </div>
            <div className='shu'>
              <div className='row'>
                <div className='edit col-md-6'>
                  <button type='button'>
                    <i className='far fa-heart' />
                  </button>
                </div>
                <div className='dot col-md-6'>
                  <button type='button'>...</button>
                </div>
                <p style={{ color: '#99999F' }}>387.222 FOLLOWERS</p>
              </div>
            </div>
          </div>
        </div>
        <div className='sideways'>
          <span className='side1'>
            <i className='fas fa-dot-circle' />1 SIDE
          </span>
          <span className='side2'>
            Album songs
            <i className='fas fa-angle-down' />
          </span>
        </div>
        <div className='sideHead'>
          <div className='sideHead1'>#</div>
          <div className='sideHead2'>TITLE</div>
          <div className='sideHead3'>ARTIST</div>
          <div className='sideHead4'>TIME</div>
        </div>
        <AlbColl />
      </div>
      <div className='smallSection'>
        <div className='secImm'>
          <img src={cardImage} alt='Album' />
        </div>
        <div className='albName'>
          <h2>Mellon Collie and the infinite Sadness</h2>
          <p className='fa fa-star'>The Smashing Pumpkins</p>
        </div>
        <div className='btnDiv'>
          <div className='btn1'>
            <button type='button'>
              <i className='far fa-heart' />
              ADD ALBUM
            </button>
          </div>
          <div className='btn2'>
            <button type='button'>
              <i className='fas fa-play' />
              PLAY
            </button>
          </div>
        </div>
        <p className='chain'>
          23.10.95<span>.</span>28 Song, 2 hr 8 min
        </p>
        <div className='downOption'>
          <span className='down1'>DOWNLOAD</span>
          <span className='down2'>
            <input type='radio' />
          </span>
        </div>
        <div className='downside'>
          <span className='down1'>
            <i className='fas fa-dot-circle' />1 SIDE
          </span>
          <span className='down2'>
            Album songs
            <i className='fas fa-angle-down' />
          </span>
        </div>
        <AlbumCollection />
        <AlbumCollection />
        <AlbumCollection />
        <AlbumCollection />
        <AlbumCollection />
        <div className='albumImage'>
          <div className='albumImage1'>
            <span className='write1'>please work</span>
            <span className='write2'>
              view <i className='fas fa-angle-right' />
            </span>
          </div>
          <div className='albumImage2'>
            <div className='albimage1'>
              <img src={cardAlb1} alt='Album Time' />
            </div>
            <div className='albimage2'>
              <img src={cardAlb2} alt='Album Time' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
