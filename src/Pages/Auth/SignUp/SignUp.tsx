/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState, useContext, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ImFacebook } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';
import Message from '../../../Components/Message/Message';
import Loader from '../../../Components/Loader/loaderFile';
import { AuthContext } from '../../../Contexts/AuthContext';
import classes from './SignUp.module.css';
import HeaderMain from '../../LandingPage/MainHeader/MainHeader';

interface Props {
  showSignIn: () => void;
}

const SignUp = ({ showSignIn }: Props) => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const { isloading, error, signUp, isloggedin } = useContext(AuthContext);
  useEffect(() => {
    if (isloggedin) {
      history.push('/home');
    }
  }, [isloggedin, history]);
  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(email, password, userName, firstName, lastName, dateOfBirth, gender);
    if (isloggedin) {
      history.push('/home');
    }
  };

  return (
    <>
      <HeaderMain />
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
            <h2 className={classes.ModalHeaderText}>Ready to sign Up?</h2>
            <h2 className={classes.ModalHeader2}>Log In</h2>
          </div>
          <div className={classes.ModalBody}>
            <div className={classes.ModalSocialMedial}>
              <button className={classes.ModalFaceBookButton}>
                <a href='https://musicboxgroupc.herokuapp.com/auth/facebook' className={classes.linkfacebook}>
                  <ImFacebook /> <span>Facebook</span>
                </a>
              </button>
              <button className={classes.ModalGoogleButton}>
                <a href='https://musicboxgroupc.herokuapp.com/auth/google' className={classes.linkgoogle}>
                  <FcGoogle style={{ fontSize: '30px' }} />
                  <span> Google</span>
                </a>
              </button>
            </div>
            <div className={classes.FormWrapper}>
              <form className={classes.form} onSubmit={(e) => signUpHandler(e)}>
                <div className={classes.Form}>
                  <input
                    className={classes.FormInput}
                    type='email'
                    value={email}
                    name='email'
                    placeholder='Enter Email'
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={classes.Form}>
                  <input
                    className={classes.FormInput}
                    type='password'
                    value={password}
                    name='password'
                    placeholder='Enter Password'
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className={classes.partitionGroup}>
                  <input
                    className={classes.formPartition}
                    type='text'
                    value={firstName}
                    name='firstname'
                    placeholder='Enter firstName'
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    className={classes.formPartition}
                    type='text'
                    value={lastName}
                    name='lastname'
                    placeholder='Enter lastName'
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className={classes.Form}>
                  <input
                    className={classes.FormInput}
                    type='text'
                    value={userName}
                    name='username'
                    placeholder='Enter Username'
                    required
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className={classes.FormSelect}>
                  <input
                    className={classes.FormInputDate}
                    type='date'
                    value={dateOfBirth}
                    name='username'
                    placeholder='Date of birth'
                    required
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                  <select
                    className={classes.select}
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value=''>Gender</option>
                    <option value='female'>Female</option>
                    <option value='male'>Male</option>
                    <option value='others'>Others</option>
                  </select>
                </div>
                <div className={classes.signUpGroup}>
                  <div className={classes.ModalTerms}>
                    <p className={classes.ModalTermsFirst}>
                      By clicking on &apos;Sign up&apos;, you accept the <br />
                      <span className={classes.ModalTermsH5}>Terms and Conditions to use</span>
                    </p>
                  </div>

                  <button className={classes.ModalSignUp} type='submit'>
                    SIGN UP
                  </button>
                </div>
              </form>
              <p className={classes.Footer}>
                Already have an account?
                <span
                  onClick={() => {
                    showSignIn();
                  }}
                  style={{ color: '#2D9BEF' }}
                >
                  Log in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
