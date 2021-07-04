import React, { useEffect, useState } from 'react';
import './Browse.css';
import { Link } from 'react-router-dom';
import axios from '../../utils/axiosInstance';
import Navbar from '../../Components/BrowseAndGenreNavbar/BrowseAndGenreNavBar';

const Browse = (): JSX.Element => {
  const [genres, getGenre] = useState([]);

  useEffect(() => {
    const myData = async () => {
      const result = await axios.get('/api/users/genres');
      getGenre(result.data.data);
    };
    myData();
  }, []);

  const getGenreDetails = (data: any) => {
    // eslint-disable-next-line no-underscore-dangle
    localStorage.setItem('genreMongoDbId', data._id);
    localStorage.setItem('genreId', data.id);
    localStorage.setItem('genreName', data.name);
  };

  const Card = (props: { [x: string]: any; details: any }) => {
    const { details } = props;
    return (
      <>
        <Link to='/genre-details' onClick={() => getGenreDetails(details)}>
          <div className='card'>
            <div className='card-image-div flex-row'>
              <img alt='card' src={details.picture} />
            </div>
            <div className='card-overlay' />
            <p className='card-title'>{details.name.toUpperCase()}</p>
          </div>
        </Link>
      </>
    );
  };

  const generateCard = genres.map((element: Record<string, any>) => {
    return <Card key={element.id} details={element} />;
  });

  return (
    <>
      <div className='browse-page-wrapper'>
        <Navbar currentPage='Genres' hideSeparator='hide' />
        <div className='browse-container'>
          <h1 className='browse-header'>Genres</h1>
          <div className='card-wrapper'>{generateCard}</div>
        </div>
      </div>
    </>
  );
};

export default Browse;
