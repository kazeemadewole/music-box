/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

import NavBar from './NavBar';
import Flow from './FlowMain';
import RecentlyPlayed from './RecentlyPlayed';
import Genre from './GenreMain';

export interface property {
  artist?: any;
  album?: any;
  playlist?: any;
}

export default function HomePage() {
  const [userName, setUserName] = useState('');
  const [searchInfo, setSearchInfo] = useState('');
  const [searchResult, setSearchResult] = useState({} as property);
  let token: any;
  let userId;
  let firstName;
  let lastName;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchInfo(e.target.value);
    console.log(e.target.value);
  }

  const callApi = async () => {
    try {
      const { data } = await axios.post('https://musicboxgroupc.herokuapp.com/api/users/login', {
        email: 'samueljames@gmail.com',
        password: '123456',
      });

      token = data.token;
      // eslint-disable-next-line dot-notation
      userId = data.user._id;
      setUserName(`${data.user.firstName} ${data.user.lastName}`);
      firstName = data.user.firstName;
      lastName = data.user.lastName;
      localStorage.setItem('token', token);

      localStorage.setItem('UserId', userId);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line no-console
      const userToken = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const { data } = await axios.get(
        `https://musicboxgroupc.herokuapp.com/api/users/search?search=${searchInfo}`,
        config
      );
      setSearchResult(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    callApi();
    return () => {
      console.log('hello');
    };
  }, []);

  return (
    <div style={{ background: 'black' }}>
      <NavBar
        name={userName}
        onChange={handleChange}
        fetchSearch={fetchSearch}
        searchResult={searchResult}
        setSearchInfo={setSearchInfo}
        setSearchResult={setSearchResult}
      />
      <Flow />
      <RecentlyPlayed />
      <Genre />
    </div>
  );
}
