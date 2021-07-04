import React from 'react';
import { Spinner } from 'react-bootstrap';
import classes from './Loader.module.css';

const LoaderFile = () => {
  return (
    <Spinner className={classes.Spinner} animation='border' role='status'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};
export default LoaderFile;
