/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import axiosInstance from '../../utils/axiosInstance';
import Cards from './Cards';
import styles from './Library.module.css';

function Playlists() {
  const [playlists, setPlaylists] = useState([] as Record<string, any>[]);
  const [show, setShow] = useState(false);
  const [genre, setGenre] = useState([] as Record<string, any>[]);
  const [createPlaylist, setCreatePlaylist] = useState({} as Record<string, any>);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const playlist = async () => {
    try {
      const tokenVal = localStorage.getItem('Token');
      const config = {
        headers: {
          Authorization: `Bearer ${tokenVal}`,
        },
      };
      const {
        data: { data },
      } = await axiosInstance.get('/api/user/playlists', config);

      setPlaylists(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getGenres = async () => {
    try {
      const tokenVal = localStorage.getItem('Token');
      const config = {
        headers: {
          Authorization: `Bearer ${tokenVal}`,
        },
      };
      const genres = await axiosInstance.get('/api/users/genres', config);
      const allGenre = genres.data.data;
      setGenre(allGenre);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    playlist();
    getGenres();
  }, []);

  /** * Creating a new playlist */

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const addPlaylist = async () => {
      try {
        const tokenVal = localStorage.getItem('Token');
        const config = {
          headers: {
            Authorization: `Bearer ${tokenVal}`,
          },
        };
        const playlistPost = await axiosInstance.post('/api/user/addplaylist', createPlaylist, config);
        setPlaylists([...playlists, ...playlistPost.data]);
      } catch (error) {
        console.log(error.message);
      }
    };
    addPlaylist();
    event.preventDefault();
  };
  const handleChange = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const { name, value } = e.target;
    const checkValue = (inputValue: string) => {
      if (inputValue === 'true') return true;
      if (inputValue === 'false') return false;
      return value;
    };
    setCreatePlaylist({
      ...createPlaylist,
      [name]: checkValue(value),
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title> Create a playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Song title'
              className={styles.modalInput}
              name='name'
              value={createPlaylist.name}
              onChange={handleChange}
            />{' '}
            <br />
            <br />
            <select
              name='isPrivate'
              value={createPlaylist.isPrivate}
              placeholder='Private/Public'
              className={styles.modalSelect}
              onChange={handleChange}
            >
              <option value='true'>Private</option>
              <option value='false'>Public</option>
            </select>
            <select name='genre' value={createPlaylist.genre} onChange={handleChange}>
              {genre.map((item) => (
                <option value={item._id}>{item.name}</option>
              ))}
            </select>
            <div>
              <button type='submit' className={styles.btnOne} onClick={handleClose}>
                Cancel
              </button>
              <button type='submit' className={styles.btnTwo} onClick={handleClose}>
                {' '}
                Create{' '}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className={styles.cont}>
        <h3 style={{ textAlign: 'left', marginLeft: '100px' }}> My Playlists</h3> <hr /> <br />
        <div className={styles.wrap}>
          <div
            className={styles.card}
            style={{
              border: '1px solid white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span onClick={handleShow} role='button'>
              <i
                className='fas fa-plus-circle'
                style={{
                  color: '#2DCEEF',
                  fontSize: '50px',
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                }}
              />
            </span>
          </div>

          {playlists.map((item) => (
            <div className={styles.test}>
              <Link to={`/playlist/${item._id}`}>
                <Cards
                  // onClick={fullSong}
                  style={{ background: `url(${item.genre.picture_big})`, backgroundRepeat: 'no-repeat' }}
                >
                  <span />
                </Cards>
              </Link>
              <p className={styles.cardDescription}> {item.name}</p>
              <p className={styles.numberOfSongs}> {item.songs.length} songs</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Playlists;
