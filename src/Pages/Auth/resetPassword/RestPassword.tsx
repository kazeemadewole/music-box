/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
// import axios from 'axios';
import axios from 'axios';
import Message from '../../../Components/Message/Message';
import Loader from '../../../Components/Loader/loaderFile';
import { AuthContext } from '../../../Contexts/AuthContext';
import classes from './resetPassword.module.css';
import MHeader from '../../LandingPage/MainHeader/MainHeader';

const ResetPassword = () => {
  //   const history = useHistory();
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const token = params.get('token');
  const userId = params.get('id');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { isloading, setIsloading } = useContext(AuthContext);

  const passwordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword === password) {
      setIsloading(true);
      setMessage('done');
      const data = {
        token,
        userId,
        password,
      };
      console.log(data);
      try {
        const res = await axios.post('https://musicboxgroupc.herokuapp.com/api/users/password-reset', data);
        if (res.status === 200) {
          setIsloading(false);
          setMessage(res.data.message);
          setError('');
        } else {
          setIsloading(false);
          setMessage('');
          setError('failed');
        }
      } catch (err) {
        setIsloading(false);
        setMessage('');
        setError(err.message);
      }
    } else {
      setMessage('');
      setError('Password does not match');
    }
  };
  return (
    <>
      <MHeader />
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
            {message && <Message variant='success'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {isloading && <Loader />}
            <h2>Reset your Password</h2>
          </div>

          <div className={classes.ModalBody}>
            <div className={classes.FormWrapper}>
              <form className={classes.form} onSubmit={(e) => passwordHandler(e)}>
                <div className={classes.Form}>
                  <label htmlFor='password' className={classes.TextLabel}>
                    New Password
                  </label>
                  <input
                    className={classes.FormInput}
                    id='password'
                    type='password'
                    value={password}
                    name='password'
                    placeholder='Enter Password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className={classes.Form}>
                  <label htmlFor='password2' className={classes.TextLabel}>
                    Confirm Password
                  </label>
                  <input
                    className={classes.FormInput}
                    id='password2'
                    type='password'
                    value={confirmPassword}
                    name='confirmpassword'
                    placeholder='Confirm Password'
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className={classes.ModalFormChild}>
                  <button className={classes.ModalLogin} type='submit'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
