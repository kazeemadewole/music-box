/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddIcon from '@material-ui/icons/Add';
import flowImage from '../../homepageImages/flowImage.jpg';
import flowImage1 from '../../homepageImages/flowImage1.jpg';
import flowImage2 from '../../homepageImages/flowImage2.jpg';
import playerContext, { SongArr } from '../../Contexts/playerContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '400px',
      height: '250px',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    playIcon: {
      height: 38,
      width: 38,
    },
  })
);

export default function Flow() {
  const [listeningHistory, setListeningHistory] = useState([] as Record<string, any>[]);
  const { handleClick } = useContext(playerContext);
  const getListeningHistory = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(`https://musicboxgroupc.herokuapp.com/api/users/listening`, config);

      const responseArr = data.message[data.message.length - 1];
      setListeningHistory([responseArr.song]);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getListeningHistory();
  }, []);

  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <h2 style={{ color: 'white', marginLeft: '100px' }}>FLOW</h2>
      <div className={classes.container}>
        <div>
          <Card className={classes.root} style={{ backgroundImage: `url(${flowImage})`, backgroundSize: 'cover' }}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component='h5' variant='h5'>
                  FLOW
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                  Listening history
                </Typography>
              </CardContent>
              {listeningHistory.map((item: Record<string, any>, index: number) => (
                <div className={classes.controls}>
                  <IconButton
                    aria-label='play/pause'
                    onClick={() => handleClick(listeningHistory, index)}
                    style={{ background: 'white' }}
                  >
                    <PlayArrowIcon className={classes.playIcon} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div>
          <Card className={classes.root} style={{ backgroundImage: `url(${flowImage1})`, backgroundSize: 'cover' }}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component='h5' variant='h5'>
                  FLOW
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label='play/pause' style={{ background: 'white' }}>
                  <AddIcon className={classes.playIcon} />
                </IconButton>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card className={classes.root} style={{ backgroundImage: `url(${flowImage2})`, backgroundSize: 'cover' }}>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component='h5' variant='h5'>
                  FLOW
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                  Mac Miller
                </Typography>
              </CardContent>
              <div className={classes.controls}>
                <IconButton aria-label='play/pause' style={{ background: 'white' }}>
                  <AddIcon className={classes.playIcon} />
                </IconButton>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
