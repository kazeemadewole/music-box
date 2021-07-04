/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BrowseAndGenreNavbar.css';
import logo from '../../assets/music-box-logo.png';

const MyNavBar = (props: any): JSX.Element => {
  const { previousPage, currentPage, urlValue, hideSeparator } = props;
  return (
    <nav className='flex-row browse-and-genre-navbar'>
      <div className='flex-row main-nav-div'>
        <div className='page-logo-div flex-row'>
          <img src={logo} alt='page-logo' />
        </div>
        <Link to='/' className='home'>
          Home
        </Link>
        <Link to='/library' className='library'>
          Library
        </Link>
        <Link to='/browse' className='browse'>
          Browse
        </Link>
      </div>
      <div className='flex-row navigation-div'>
        <Link to={urlValue} className='previous-page'>
          {previousPage}
        </Link>
        <i className={`${hideSeparator} fas fa-slash fa-rotate-90 `} />
        <span className='current-page'>{currentPage}</span>
      </div>
      <div className='flex-row profile-and-search-div'>
        <div className='search-div flex-row'>
          <i className='fas fa-search' />
          <input type='text' placeholder='Search' />
        </div>
        <div className='profile-info-div flex-row'>
          <i className='fas fa-user-circle' />
          <span>John Doe</span>
          <i className='fas fa-angle-down' />
        </div>
      </div>
    </nav>
  );
};

export default MyNavBar;
