/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { Dropdown } from 'react-bootstrap';
import cardImage from '../img/Classic rock.png';
import PlaylistComponent from './PlaylistComponent';
import RefreshComponent from './RefreshComponent';
import Loader from '../Loader/Loader';
import './playlist.css';
import axios from '../../utils/axiosInstance';
import playerContext from '../../Contexts/playerContext';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Playlist = () => {
  const [playlist, setPlaylist] = useState({} as Record<string, any>);
  const [isLoading, setIsLoading] = useState(false);

  const { handleClick } = useContext(playerContext);
  let token: any;
  const { id }: Record<string, any> = useParams();
  const userPlayList = async () => {
    setIsLoading(true);
    const tokenValue = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${tokenValue}`,
      },
    };
    try {
      const { data } = await axios.get(`https://musicboxgroupc.herokuapp.com/api/user/playlists/${id}`, config);
      console.log(data.data);
      setPlaylist({ ...data.data });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    userPlayList();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='containers bagg1'>
          {/* <div className='bigNavbar'>
            <div className='one'>
              <div className='logo'>Logo</div>
              <div className='links'>
                <ul>
                  <li>Home</li>
                  <li>
                    <Link to='/artist'>Browse</Link>
                  </li>
                  <li className='lib'>
                    <Link to='/album'>Library.</Link>
                  </li>
                  <li>
                    Playlists /<span> Classic rock</span>
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
          <div className='smallNavbar'>
            <div className='lastone'>
              <li>
                <i className='fas fa-arrow-left' />
              </li>
            </div>
            <div className='lasttwo'>
              <div className='share'>
                <i className='fa fa-share-alt' aria-hidden='true' />
              </div>
              <div className='share'>
                <i className='fas fa-ellipsis-v fa-lg' />
              </div>
            </div>
          </div> */}
          <div className='container playHead'>
            <div className='row'>
              <div className='cardNow'>
                <img src={cardImage} className='card-img-top' style={{ height: '100%', width: '100%' }} alt='...' />
              </div>
              <div className='playTitle'>
                <p>Created playlist</p>
                <h5>Classic rock</h5>
                <p className='no'>no description</p>
                <p className='nodate'>13 Song, 1 hr 13 min</p>
              </div>
              <div className='rare'>
                <div className='shuffle'>
                  <button type='button'>SHUFFLE PLAY</button>
                </div>
                <div className='shu'>
                  <div className='row'>
                    <div className='edit col-md-6'>
                      <button type='button'>edit</button>
                    </div>
                    <div className='dot col-md-6'>
                      <button type='button'>...</button>
                    </div>
                    <p style={{ color: '#99999F' }}>Created 19/03/2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container playHeadSmall'>
            <div className='smallImage'>
              <img src={cardImage} className='smallcard' alt='...' />
            </div>
            <div className='clasicRock'>
              <h2>Classic rock</h2>
            </div>
            <div className='clasicSongs'>
              <h2>13 Songs, 1 hr 13 min</h2>
            </div>
            <div className='clasicBtn'>
              <button type='button' className='editBtn'>
                <i className='fa fa-solid fa-pen' style={{ paddingRight: '5px' }} />
                EDIT
              </button>
              <button type='button' className='shuBtn'>
                <i className='fas fa-regular fa-random' style={{ paddingRight: '5px' }} />
                SHUFFLE PLAY
              </button>
            </div>
            <div className='lastBtn'>
              <p>No description</p>
            </div>
          </div>
          <div className='container plays'>
            <div className='row'>
              <div className='col-md-2'>
                <div className='playSearch'>
                  <i className='fas fa-search searchPlay' />
                  <input className='searchMe' type='text' placeholder='playlist search' />
                </div>
              </div>
              <div className='col-md-2 offset-md-8 sureSong'>
                <p>
                  Playlist songs <i className='fas fa-angle-down' />
                </p>
              </div>
            </div>
          </div>
          <div className='container playSmall'>
            <div className='smallFirst'>
              <button type='button'>DOWNLOAD</button>
              <input type='radio' />
            </div>
            <div className='smallSecond'>
              <div className='smallSecond-search'>
                <i className='fas fa-search' />
                <p>
                  Playlist songs <i className='fas fa-angle-down' />
                </p>
              </div>
            </div>
          </div>
          <div className='container songHead'>
            <div className='row'>
              <div className='number'>#</div>
              <div className='title'>TITLE</div>
              <div className='artist'>ARTIST</div>
              <div className='ablum'>ABLUM</div>
              <div className='time'>TIME</div>
            </div>
          </div>
          {playlist.songs &&
            playlist.songs.map((song: any, index: number) => (
              <PlaylistComponent
                handleClick={handleClick}
                song={playlist.songs}
                number={index}
                title={song.title}
                artist={song.artist}
                album={song.album}
                time={song.duration}
              />
            ))}

          <div className='container plays'>
            <div className='row'>
              <div className='col-md-2'>
                <div className='playSearches'>
                  <button className='refresh' type='submit'>
                    REFRESH
                  </button>
                </div>
              </div>
              <div className='col-md-2 offset-md-8 sureSong'>
                <p>
                  Recommemded Songs <i className='' />
                </p>
              </div>
            </div>
          </div>
          <div className='container songHead'>
            <div className='row'>
              <div className='number'>#</div>
              <div className='title'>TITLE</div>
              <div className='artist'>ARTIST</div>
              <div className='ablum'>ABLUM</div>
              <div className='time' />
            </div>
          </div>
          <RefreshComponent />
          <RefreshComponent />
          <RefreshComponent />
          <RefreshComponent />
          <RefreshComponent />
          <RefreshComponent />
        </div>
      )}
    </>
  );
};

export default Playlist;
