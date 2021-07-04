/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Grid, Container, TextField, MenuItem } from '@material-ui/core';
import '../listeningHistory/style.css';
import './modal.css';
import axios from 'axios';
import image from './user.png';
import PasswordModal from './PasswordModal';
import Header from '../listeningHistory/Navbar';
import BottomComp from './Bottom';
import Toast from './Toast';

interface userInterface {
  firstName?: string;
  lastName?: string;
  email?: string;
  gender?: string;
  dateOfBirth: string;
  _id: string;
}
interface Info {
  oldPassword: string;
  newPassword: string;
}
const UserForm = () => {
  const [user, setUser] = useState({} as userInterface);
  const [field, setField] = useState({
    modal: false,
    toast: '',
  });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');
  const history = useHistory();
  // let token: string;
  // let userId;
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
    console.log('logged out');
  };
  const onBlurFunc = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const { firstName, lastName, gender } = user;
      await axios.patch(
        `https://musicboxgroupc.herokuapp.com/api/users/me`,
        { firstName, lastName, gender },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log('User profile modified');
    } catch (err) {
      setUser({} as userInterface);
      setTimeout(() => {
        setError('');
      }, 1000);
      console.log(err.message);
      return setError(err.message);
    }
  };
  const changeName = (event: React.FormEvent<HTMLInputElement>) => {
    const { name } = event.target as HTMLInputElement;
    if (event.target) {
      const newName = (event.target as HTMLInputElement).value;
      setUser({ ...user, [name]: newName });
    }
  };
  const changePassword = async (e: any) => {
    try {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setError2('');
        }, 5000);
        console.log('please ensure your new passwords match');
        return setError2('please ensure your new passwords match');
      }

      const data: Info = {
        oldPassword,
        newPassword,
      };
      const userToken = localStorage.getItem('Token');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      await axios.put(`https://musicboxgroupc.herokuapp.com/api/users/changepassword`, data, config);
      setField({
        ...field,
        modal: false,
        toast: 'Your Password was changed successfully.',
      });
      setTimeout(
        () =>
          setField({
            ...field,
            modal: false,
            toast: '',
          }),
        2000
      );
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError2('');
      }, 5000);
      console.log(err.message);
      return setError2(err.message);
    }
  };
  useEffect(() => {
    try {
      const currentUser = localStorage.getItem('user') as string;
      const userValue = JSON.parse(currentUser);
      setUser(userValue.user);
    } catch (err) {
      console.log('error fetching user');
    }
  }, []);
  const days: number[] = Array.from({ length: 31 }, (x, i) => i);
  const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    <div className='par'>
      <Header firstName={user.firstName} logOut={logOut} />
      <PasswordModal
        show={field.modal}
        close={() => {
          setField({ ...field, modal: false });
        }}
      >
        <form className='form1' onSubmit={changePassword}>
          {error2 && <span className='error-message'>{error2} </span>}
          <div className='modalHeader'>Change Password</div>
          <div className='contentWrap'>
            <input
              type='password'
              placeholder=''
              className='tittle'
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <br />
            <div className='genreCat'>
              <span>
                <label>New Password</label>
                <br />
                <input
                  type='password'
                  className='tittle'
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </span>
            </div>
            <br />
            <div className='genreCat'>
              <span>
                <label>Confirm New Password</label>
                <br />
                <input
                  type='password'
                  className='tittle'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </span>
            </div>
            <br />
            <span className='btnContainer'>
              <button
                className='cancelBtn'
                onClick={() => {
                  setField({ ...field, modal: false });
                }}
              >
                Cancel
              </button>
              <button type='submit' className='createBtn'>
                Submit
              </button>
            </span>
          </div>
        </form>
      </PasswordModal>
      <Toast toast={field.toast} close={null} />
      {error && <span className='error-message'>{error} </span>}
      <div className='container'>
        <div className='flex-container'>
          <div className='image-parent'>
            <img src={image} alt='user icon' className='image' />
          </div>
          <div className='try'>
            <Col>
              <Row className='user1' style={{ marginTop: '15px' }}>
                {user.firstName} {user.lastName}
              </Row>
              <Row className='free-account'>
                <p>Free Account</p>
              </Row>
            </Col>
          </div>
          <div className='premium' id='premium'>
            GO TO PREMIUM
          </div>
        </div>
        <div className='form'>
          <h3 className='form-title contact'>Contact</h3>
        </div>
        <div>
          <div>
            <div>
              <div className='col-md-12 '>
                <div className='row'>
                  <div className='col-lg-6 mb-3 userDet'>
                    <input
                      type='text'
                      name='firstName'
                      value={user.firstName}
                      className='form-control  text-white border-bottom border-white border-0 rounded-0 userDet userInfo userInfoChild'
                      placeholder='first name'
                      onChange={changeName}
                      onBlur={onBlurFunc}
                    />
                  </div>
                  <div className='col-lg-6 mb-3 userDet'>
                    <input
                      type='text'
                      name='lastName'
                      value={user.lastName}
                      className='form-control text-white border-bottom border-white border-0 rounded-0 userDet userInfo'
                      placeholder='last name'
                      onChange={changeName}
                      onBlur={onBlurFunc}
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12 mb-3 mt-3 userDet'>
                    <input
                      type='text'
                      name='email'
                      value={user.email}
                      className='form-control form-control-sm text-white border-bottom border-white border-0 rounded-0 userDet userInfo'
                      placeholder='email'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container style={{ maxWidth: '80%' }}>
        <Grid className='roww' justify='space-between' align-items='center' spacing={5} container>
          <Grid item md={6} xs={12} className='gridd'>
            <TextField label='Gender' id='gender' className='white' select fullWidth>
              <MenuItem value={10}>Male</MenuItem>
              <MenuItem value={20}>Female</MenuItem>
            </TextField>
          </Grid>
          <Grid item md={6} xs={12} className='gridd'>
            <TextField label='Country' id='country' className='white' select fullWidth>
              <MenuItem value='nigeria'>Nigeria</MenuItem>
              <MenuItem value='South Africa'>South Africa</MenuItem>
              <MenuItem value='Ghana'>Ghana</MenuItem>
              <MenuItem value='Cameroun'>Cameroun</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Grid className='roww' justify='space-between' align-items='center' spacing={5} container>
          <Grid item md={4} xs={12} className='gridd'>
            <TextField label='Date of Birth' id='date' className='white' select fullWidth>
              {days.map((index) => {
                return <MenuItem value={index + 1}>{index + 1}</MenuItem>;
              })}
            </TextField>
          </Grid>
          <Grid item md={4} xs={12} className='gridd'>
            <TextField label='Month' id='month' className='white' select fullWidth>
              {months.map((month) => {
                return <MenuItem value={month}>{month}</MenuItem>;
              })}
            </TextField>
          </Grid>
          <Grid item md={4} xs={12} className='gridd'>
            <TextField label='Year' id='year' className='white' select fullWidth style={{ color: 'white' }}>
              <MenuItem value='2020'>2020</MenuItem>
              <MenuItem value='2019'>2019</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Container>
      <BottomComp />
      <div className='account-parent'>
        <h5 className='account'>Account</h5>
        <div className='notifications'>
          <p>Enable Browser Notifications</p>
        </div>
        <div>
          <p className='notifications'>Language</p>
        </div>
        <p
          className='notifications change-password'
          onClick={() => {
            setField({ ...field, modal: true });
          }}
        >
          Change Password
        </p>
        <p className='notifications'>Add new account</p>
        <p className='notifications2'>Terms and Conditions</p>
        <p className='notifications2'>Privacy Policy</p>
        <p className='notifications2'>Support</p>
      </div>
      <button className='logout' onClick={() => logOut()}>
        LOG OUT
      </button>
    </div>
  );
};

export default UserForm;
