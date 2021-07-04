/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable guard-for-in */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// interface GenreObject {
//   id: number;
//   _id: string;
//   name: string;
//   picture: string;
//   picture_big: string;
//   picture_small: string;
//   picture_medium: string;
//   picture_xl: string;
//   type: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// interface GenreArray {
//   [index: number]: GenreObject;
// }

function getRandom(arr: Record<string, any>[]) {
  const result: number[] = [];
  const final = [];
  arr.map((item) => {
    const rdm = Math.floor(Math.random() * arr.length);
    result.push(rdm);
  });
  const newArr = [...new Set(result)];
  for (let key = 0; key < newArr.length; key++) {
    final.push(arr[key]);
  }
  return final.splice(2, 6);
}

export default function Genre() {
  const [allGenres, setAllGenres] = useState([] as Record<string, any>[]);
  const getGenres = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(`https://musicboxgroupc.herokuapp.com/api/users/genres`, config);

      const responseArr = data.data;
      const randomGenres = getRandom(responseArr);
      // console.log('random', randomGenres);
      setAllGenres(randomGenres);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);
  console.log('my state', allGenres);

  const useStyles = makeStyles({
    root: {
      width: '210px',
      height: '200px',
      boxShadow: '10px 10px #e0ffff',
      borderRadius: '10px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    title: {
      fontWeight: 'bold',
      color: 'white',
      marginTop: '100px',
      marginLeft: '50px',
      textShadow: '2px 1px gray',
    },
    container: {
      display: 'flex',
      justifyContent: 'space-evenly',
      background: 'black',
      marginTop: '200px',
      height: '400px',
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.container}>
      {allGenres.map((item) => (
        <div>
          <Card
            className={classes.root}
            style={{
              backgroundImage: `url(${item.picture_medium})`,
            }}
          >
            <CardContent>
              <Typography variant='h5' component='h2' className={classes.title}>
                {item.name}
              </Typography>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
