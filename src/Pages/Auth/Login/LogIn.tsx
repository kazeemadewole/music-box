/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaArrowLeft } from 'react-icons/fa';
import { ImFacebook } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import Message from '../../../Components/Message/Message';
import Loader from '../../../Components/Loader/loaderFile';
import { AuthContext } from '../../../Contexts/AuthContext';
import classes from './LogIn.module.css';
import MainHeader from '../../LandingPage/MainHeader/MainHeader';

const LogIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(true);
  const { isloading, setIsloading, error, login, isloggedin } = useContext(AuthContext);

  useEffect(() => {
    if (isloggedin) {
      history.push('/home');
    }
  });

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsloading(true);
    login(email, password);
    if (isloggedin) {
      history.push('/home');
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
          <div className={classes.header}>
            {error && <Message variant='danger'>{error}</Message>}
            {isloading && <Loader />}
            <h2 className={classes.ModalHeaderText}>What will you listen to today?</h2>
            <h2 className={classes.ModalHeader2}>Log In</h2>
          </div>

          <div className={classes.ModalBody}>
            <div className={classes.ModalSocialMedial}>
              <button className={classes.ModalFaceBookButton}>
                <a href='https://musicboxgroupc.herokuapp.com/auth/facebook' className={classes.linkfacebook}>
                  <div className={classes.socialLoginText}>
                    <ImFacebook />
                    <span>
                      <span className={classes.mobileOnly}>Log in With </span>Facebook
                    </span>
                  </div>
                </a>
              </button>
              <button className={classes.ModalGoogleButton}>
                <a href='https://musicboxgroupc.herokuapp.com/auth/google' className={classes.linkgoogle}>
                  <div className={classes.socialLoginText}>
                    <FcGoogle style={{ fontSize: '30px' }} />
                    <span>
                      <span className={classes.mobileOnly}>Log in With</span> Google
                    </span>
                  </div>
                </a>
              </button>
            </div>
            <div className={classes.FormWrapper}>
              <form className={classes.form} onSubmit={(e) => loginHandler(e)}>
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
                <div className={classes.Form}>
                  <label htmlFor='password' className={classes.TextLabel}>
                    Password
                  </label>
                  <input
                    className={classes.FormInput}
                    type='password'
                    id='password'
                    value={password}
                    name='password'
                    placeholder='Enter Password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={classes.ModalFormChild}>
                  <div className={classes.ModalFormChilds}>
                    <input
                      type='checkbox'
                      id='RememberMe'
                      checked={check}
                      value='Remember Me'
                      onChange={() => setCheck(!check)}
                    />
                    <label htmlFor='RememberMe' className={classes.InputLabel}>
                      Remember Me
                    </label>
                  </div>
                  <button className={classes.ModalLogin} type='submit'>
                    LOG IN
                  </button>
                </div>
              </form>
              <Link to='/forgotPassword'>
                <p className={classes.Para}>Forgot your password?</p>
              </Link>
              <p className={classes.BtnP}>Don&apos;t you have an account?</p>
              <button className={classes.ModalSignUp}>
                <Link to='/signup'>SIGN UP FOR MUSICBOX </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
