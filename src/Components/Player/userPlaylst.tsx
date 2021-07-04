/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from 'react';
import axios from '../../utils/axiosInstance';
import PlayerContext from '../../Contexts/playerContext';
import classes from './Player.module.css';

const UserPlaylist = () => {
  const { handleAddSong } = useContext(PlayerContext);
  const userId = localStorage.getItem('UserId');
  const [userPlaylist, setUserPlaylist] = useState([] as Record<string, any>[]);

  const data = async () => {
    const dataValue = await axios.get(`/api/user/playlists`);
    const value = dataValue.data.data.filter((playlist: Record<string, any>) => playlist.createdBy === userId);
    setUserPlaylist(value);
  };
  useEffect(() => {
    data();
  }, []);

  const playlistList = userPlaylist.map((playlist: Record<string, any>) => (
    <div className='playlist_display' onClick={() => handleAddSong(playlist._id)} key={playlist._id}>
      {playlist?.name}
    </div>
  ));
  return (
    <>
      {playlistList.length ? (
        playlistList
      ) : (
        <div className={classes.playlist_display}>
          <p>No Playlist Found</p>
        </div>
      )}
    </>
  );
};

export default UserPlaylist;
