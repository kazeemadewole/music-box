/* eslint-disable no-extend-native */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import Header from './Navbar';

declare global {
  interface Date {
    getWeek(start?: number): number;
  }
}

interface SongInterface {
  songDetail: Record<string, any>;
  song: Record<string, any>;
}
type SongArr = SongInterface[];
Date.prototype.getWeek = function () {
  const onejan: number = new Date(this.getFullYear(), 0, 1) as unknown as number;
  const today: number = new Date(this.getFullYear(), this.getMonth(), this.getDate()) as unknown as number;
  const dayOfYear = (today - onejan + 86400000) / 86400000;
  return Math.ceil(dayOfYear / 7);
};

const MainSection = () => {
  const history = useHistory();
  const [noOfElement, setNoOfElement] = useState(2);
  const [noOfElement2, setNoOfElement2] = useState(2);
  const [noOfElement3, setNoOfElement3] = useState(2);
  const [songs, setSongs] = useState([] as SongArr);
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
    console.log('logged out');
  };
  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };
  const loadMore2 = () => {
    setNoOfElement2(noOfElement2 + noOfElement2);
  };
  const loadMore3 = () => {
    setNoOfElement3(noOfElement3 + noOfElement3);
  };
  const yesterday = songs.filter((item) => {
    let value = new Date().getDay() - 1;
    value = value === -1 ? 6 : value;
    return new Date(item.songDetail.updatedAt).getDay() === value;
  });
  const today = songs.filter((item) => {
    return new Date(item.songDetail.updatedAt).getDay() === new Date().getDay();
  });
  const lastWeek = songs.filter((item) => {
    return new Date().getWeek() - new Date(item.songDetail.updatedAt).getWeek() === 1;
  });

  const currentUserToken = localStorage.getItem('token');
  const currentUserObject = localStorage.getItem('user') as string;
  const userObject = JSON.parse(currentUserObject);
  const userFirstName: string = userObject.user.firstName;
  // const userLastName = localStorage.getItem('lastName');
  const getRecentlyPlayed = async () => {
    try {
      const recentlyListened = await axios.get(`https://musicboxgroupc.herokuapp.com/api/users/listening`, {
        headers: {
          Authorization: `Bearer ${currentUserToken}`,
        },
      });
      console.log(recentlyListened.data.message);
      setSongs(recentlyListened.data.message);
    } catch (err) {
      throw new Error(err.message);
    }
  };
  useEffect(() => {
    getRecentlyPlayed();
  }, []);
  return (
    <div className='par tablePar'>
      <Header firstName={userFirstName} logOut={logOut} />
      {songs && today.length !== 0 && (
        <div className='subtitlePar'>
          <h5 className='subtitle'>Today</h5>
          <table>
            <thead>
              <tr>
                <th className='space lsSpace none'>#</th>
                <th className='none'>Title</th>
                <th className='none'>Artist</th>
                <th className='none'>Album</th>
                <th className='none'>Time</th>
              </tr>
            </thead>
            <tbody>
              {songs
                .filter((item) => {
                  return new Date(item.songDetail.updatedAt).getDay() === new Date().getDay();
                })
                .map((item, index) => (
                  <tr key={item.songDetail._id}>
                    <td className='lsSpace'>
                      <p className='lsSpaceP'>
                        {index + 1}
                        <img src={item.song.artist.picture_small} alt='song' className='space-left' />
                      </p>
                    </td>
                    <td className='listeningTitle'>
                      <p>{item.song.title}</p>
                    </td>
                    <td className='none'>
                      <p>{item.song.artist.name}</p>
                    </td>
                    <td className='none'>
                      <p>{item.song.album.title}</p>
                    </td>
                    <td className='none'>
                      <p>{(item.song.duration / 60).toFixed(2)}</p>
                    </td>
                    <td className='iconic none'>
                      <p>
                        <span>
                          <i className='far fa-heart space icony' />
                        </span>
                        <span>
                          <i className='fas fa-plus icony' />
                        </span>
                      </p>
                    </td>
                  </tr>
                ))
                .slice(0, noOfElement)}
            </tbody>
          </table>
          {noOfElement < today.length && (
            <button className='btn-dark logout' onClick={() => loadMore()}>
              Load More
            </button>
          )}
        </div>
      )}
      {songs && yesterday.length !== 0 && (
        <div className='subtitlePar'>
          <h5 className='subtitle'>Yesterday</h5>
          <i className='fa fa-angle-down downn' />
          <table>
            <thead>
              <tr>
                <th className='space lsSpace none'>#</th>
                <th className='none'>Title</th>
                <th className='none'>Artist</th>
                <th className='none'>Album</th>
                <th className='none'>Time</th>
              </tr>
            </thead>
            <tbody>
              {songs
                .filter((item) => {
                  let value = new Date().getDay() - 1;
                  value = value === -1 ? 6 : value;
                  return new Date(item.songDetail.updatedAt).getDay() === value;
                })
                .map((item, index) => (
                  <tr key={item.songDetail._id}>
                    <td className='lsSpace'>
                      <p className='lsSpaceP'>
                        {index + 1}
                        <img src={item.song.artist.picture_small} alt='song' className='space-left' id='space-left' />
                      </p>
                    </td>
                    <td className='listeningTitle'>
                      <p>{item.song.title}</p>
                    </td>
                    <td className='none'>
                      <p>{item.song.artist.name}</p>
                    </td>
                    <td className='none'>
                      <p>{item.song.album.title}</p>
                    </td>
                    <td className='none'>
                      <p>{(item.song.duration / 60).toFixed(2)}</p>
                    </td>
                    <td className='iconic none'>
                      <p>
                        <span>
                          <i className='far fa-heart space icony' />
                        </span>
                        <span>
                          <i className='fas fa-plus icony' />
                        </span>
                      </p>
                    </td>
                  </tr>
                ))
                .slice(0, noOfElement2)}
            </tbody>
          </table>
          {noOfElement2 < yesterday.length && (
            <button className='btn-dark logout' onClick={() => loadMore2()}>
              Load More
            </button>
          )}
        </div>
      )}
      {songs && lastWeek.length !== 0 && (
        <div className='subtitlePar'>
          <h5 className='subtitle'>Last Week</h5>
          <i className='fa fa-angle-down downn' />
          <table>
            <thead>
              <tr>
                <th className='space lsSpace none' style={{ width: '10px' }}>
                  #
                </th>
                <th className='none'>Title</th>
                <th className='none'>Artist</th>
                <th className='none'>Album</th>
                <th className='none'>Time</th>
              </tr>
            </thead>
            <tbody>
              {songs
                .filter((item) => {
                  return new Date().getWeek() - new Date(item.songDetail.updatedAt).getWeek() === 1;
                })
                .map((item, index) => (
                  <tr key={item.songDetail._id}>
                    <td className='lsSpace'>
                      <p className='lsSpaceP'>
                        {index + 1}
                        <img src={item.song.artist.picture_small} alt='song' className='space-left' />
                      </p>
                    </td>
                    <td className='listeningTitle'>
                      <p>{item.song.title}</p>
                    </td>
                    <td className='none'>
                      <p>{item.song.artist.name}</p>
                    </td>
                    <td className='none'>
                      <p>{item.song.album.title}</p>
                    </td>
                    <td className='none'>
                      <p>{(item.song.duration / 60).toFixed(2)}</p>
                    </td>
                    <td className='iconic none'>
                      <p>
                        <span>
                          <i className='far fa-heart space icony' />
                        </span>
                        <span>
                          <i className='fa fa-plus icony' />
                        </span>
                      </p>
                    </td>
                  </tr>
                ))
                .slice(0, noOfElement3)}
            </tbody>
          </table>
          {noOfElement3 < lastWeek.length && (
            <button className='btn-dark logout' onClick={() => loadMore3()}>
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MainSection;
