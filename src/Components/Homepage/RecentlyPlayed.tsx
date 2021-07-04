/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface Artist {
  name: string;
  picture: string;
  likes: number;
  tracks: string;
}

interface Playlist {
  name: string;
  likes: number;
  picture: string;
  songs: [];
}

interface Album {
  name: string;
  picture: string;
  likes: number;
  songs: string;
}
export default function RecentlyPlayed() {
  const [albumDetails, setAlbumDetails] = useState({} as Album);
  const [playlistDetails, setPlaylistDetails] = useState({} as Playlist);
  const [artistDetails, setArtistDetails] = useState({} as Artist);

  const getRecentlyPlayed = async () => {
    try {
      // eslint-disable-next-line no-console
      const userToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(`https://musicboxgroupc.herokuapp.com/api/users/recentlyplayed`, config);

      setAlbumDetails({
        name: data.data.albumDirectory.title,
        picture: data.data.albumDirectory.cover,
        likes: data.data.albumDirectory.likeCount,
        songs: data.data.albumDirectory.tracklist,
      });
      setPlaylistDetails({
        name: data.data.playListDirectory.name,
        likes: data.data.playListDirectory.likeCount,
        picture: data.data.playListDirectory.genre.picture,
        songs: data.data.playListDirectory.songs,
      });
      setArtistDetails({
        name: data.data.artistDirectory.name,
        likes: data.data.artistDirectory.likedCount,
        picture: data.data.artistDirectory.picture,
        tracks: data.data.artistDirectory.tracklist,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecentlyPlayed();
  }, []);

  const useStyles = makeStyles(() =>
    createStyles({
      content: {
        display: 'flex',
        marginTop: '90px',
        height: '200px',
        background: 'black',
      },
      root1: {
        display: 'flex',
        minWidth: 200,
        height: '210px',
        marginLeft: '355px',
        backgroundImage: `url(${artistDetails.picture})`, // artist
        backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        background: 'black',
        borderRadius: '15px',
        boxShadow: '10px 10px #e0ffff',
      },
      root2: {
        display: 'flex',
        minWidth: 200,
        height: '210px',
        marginLeft: '130px',
        backgroundImage: `url(${playlistDetails.picture})`,
        backgroundSize: 'cover',
        background: 'black',
        borderRadius: '15px',
        boxShadow: '10px 10px #e0ffff',
        //   marginTop: '90px',
      },
      root3: {
        display: 'flex',
        minWidth: 200,
        height: '210px',
        marginLeft: '193px',
        backgroundImage: `url(${albumDetails.picture})`,
        backgroundSize: 'cover',
        background: 'black',
        borderRadius: '15px',
        boxShadow: '10px 10px #e0ffff',
        //   marginTop: '90px',
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
    })
  );
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <>
        <Card className={classes.root1}></Card>
        <Typography style={{ color: 'white', marginTop: '230px', marginLeft: '-140px' }}>
          {artistDetails.name}
        </Typography>

        {artistDetails.likes > 0 && (
          <p style={{ color: 'white', marginTop: '258px', marginLeft: '-60px' }}>
            <FavoriteIcon style={{ fontSize: '18px' }} />
            {artistDetails.likes}
          </p>
        )}
      </>

      <>
        <Card className={classes.root2}></Card>
        <Typography style={{ color: 'white', marginTop: '230px', marginLeft: '-150px' }}>
          {playlistDetails.name}
        </Typography>
        {playlistDetails.likes > 0 && (
          <p style={{ color: 'white', marginTop: '258px', marginLeft: '-30px' }}>
            <FavoriteIcon style={{ fontSize: '18px' }} />
            {playlistDetails.likes}
          </p>
        )}
      </>
      <>
        <Card className={classes.root3}></Card>
        <Typography style={{ color: 'white', marginTop: '230px', marginLeft: '-120px' }}>
          {albumDetails.name}
        </Typography>
        {albumDetails.likes > 0 && (
          <p style={{ color: 'white', marginTop: '258px', marginLeft: '-30px' }}>
            <FavoriteIcon style={{ fontSize: '18px' }} />
            {albumDetails.likes}
          </p>
        )}
      </>
    </div>
  );
}
