/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import Message from '../../../Components/Message/Message';
import Loader from '../../../Components/Loader/loaderFile';
import { AuthContext } from '../../../Contexts/AuthContext';
import classes from './forgotPassword.module.css';
import MainHeader from '../../LandingPage/MainHeader/MainHeader';

const ForgotPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { isloading, setIsloading, error, isloggedin, setError } = useContext(AuthContext);

  useEffect(() => {
    if (isloggedin) {
      history.push('/home');
    }
  });

  const passwordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const res = await axios.post('https://musicboxgroupc.herokuapp.com/api/users/forgot-password', { email });
      if (res.data.status === 'success') {
        setMessage('Check your email');
        setError('');
        setIsloading(false);
      } else {
        setError('something went wrong');
        setMessage('');
        setIsloading(false);
      }
    } catch (err) {
      setError(err.message);
      setMessage('');
      setIsloading(false);
    }
  };
  return (
    <>
      <MainHeader />
      <div className={classes.divWrapper}>
        <div className={classes.ModalWrapper}>
          <div className={classes.close}>
            <Link to='/'>
              <FaArrowLeft className={classes.arrow} />
            </Link>
            <Link to='/'>
              <IoMdClose className={classes.imgClose} />
            </Link>
          </div>
          <div className={classes.ModalBody}>
            <div className={classes.header}>
              {message && <Message variant='success'>{message}</Message>}
              {error && <Message variant='danger'>{error}</Message>}
              {isloading && <Loader />}
              <h2>Password Reset</h2>
              <p className={classes.paragraph}>
                Enter the email address that you used to register. We&apos;ll send you an email with a link to reset
                your password.
              </p>
            </div>
            <div className={classes.FormWrapper}>
              <form className={classes.form} onSubmit={(e) => passwordHandler(e)}>
                <div className={classes.Form}>
                  <label htmlFor='email' className={classes.TextLabel}>
                    Email
                  </label>
                  <input
                    className={classes.FormInput}
                    id='email'
                    type='email'
                    value={email}
                    name='email'
                    placeholder='Enter Email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={classes.ModalFormChild}>
                  <button className={classes.ModalLogin} type='submit'>
                    Send
                  </button>
                </div>
              </form>
              <p className={classes.BtnP}>Don&apos;t you have an account?</p>
              <button className={classes.ModalSignUp}>
                <Link to='/signup'>Sign Up </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
