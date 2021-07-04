/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Cards from './Cards';
import styles from './Library.module.css';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Albulms() {
  const [albums, setAlbms] = useState([] as Record<string, unknown>[]);

  const getAlbum = async () => {
    try {
      const tokenValue = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      };
      const data = await axiosInstance.get('/api/user/albumlibrary', config);
      setAlbms(data.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAlbum();
  }, []);

  const history = useHistory();

  return (
    <div className={styles.cont}>
      <h3 style={{ textAlign: 'left', marginLeft: '100px' }}> My Albums</h3> <hr /> <br />
      <div className={styles.wrap}>
        {albums.map((item) => (
          <Link to={`album/${item.id}`}>
            <div className={styles.test}>
              <Cards
                onClick={() => history.push('/playlists')}
                style={{ background: `url(${item.cover_big})`, backgroundRepeat: 'no-repeat' }}
              >
                <span />
              </Cards>
              <p className={styles.cardDescription}> {item.title}</p>
              <p className={styles.numberOfSongs}> {item.nb_tracks} songs</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Albulms;
