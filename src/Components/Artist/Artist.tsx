/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import cardImage from '../img/70s ROCK.png';
import ArtistComponent from './ArtistComponent';
import FeaturedArtist from './FeaturedArtist';
import axios from '../../utils/axiosInstance';
import './Artist.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Artist = () => {
  const userArtist = async () => {
    const tokenValue = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    };
    try {
      const { data } = await axios.get(`https://musicboxgroupc.herokuapp.com/api/artists/259`, config);
      console.log(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // userArtist();
  }, []);
  const firstname = localStorage.getItem('firstname');
  return (
    <div className='containers bagg2'>
      <div className='biggy'>
        <div className='one'>
          <div className='logo'>Logo</div>
          <div className='links'>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/album'>Libray</Link>
              </li>
              <li className='lib'>Browse.</li>
              <li>
                ROCK /<span> 70s Rock Anthems</span>
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
      <div className='smally'>
        <div className='lastone'>
          <li>
            <i className='fas fa-arrow-left'> Back</i>
          </li>
        </div>
        <div className='lasttwo'>
          <div className='share'>
            <i className='' aria-hidden='true'>
              My Artists
            </i>
          </div>
        </div>
      </div>
      <div className='container RockHead'>
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
      </div>
      <div className='container playArt'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='playSearch'>
              <i className='fas fa-search searchPlay' />
              <input className='searchMe' type='text' placeholder='playlist search' />
            </div>
          </div>
          <div className='col-md-2 offset-md-7 sureSong'>
            <p>
              Playlist songs <i className='fas fa-angle-down' />
            </p>
          </div>
        </div>
      </div>
      <div className='container songHeader'>
        <div className='row'>
          <div className='number'>#</div>
          <div className='imm' />
          <div className='title'>TITLE</div>
          <div className='artist'>ARTIST</div>
          <div className='ablum'>ABLUM</div>
          <div className='time'>TIME</div>
        </div>
      </div>
      <ArtistComponent />
      <div className='container playArt' style={{ marginBottom: '30px' }}>
        <div className='row'>
          <div className='col-md-3'>
            <div className='playSearch'>
              <p>Featured artist</p>
            </div>
          </div>
          <div className='col-md-2 offset-md-7 sureSong'>
            <i className='fas fa-angle-left' />
            <i className='fas fa-angle-right' />
          </div>
        </div>
      </div>
      <FeaturedArtist />
    </div>
  );
};

export default Artist;
