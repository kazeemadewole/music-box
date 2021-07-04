/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: `https://musicboxgroupc.herokuapp.com`,
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});
const userData = {
  email: 'samueljames@gmail.com',
  password: '123456',
};

export const signIn = async () => {
  const { data } = await axiosInstance.post('/api/users/login', userData);
  localStorage.setItem('token', data.token);
};
export default axiosInstance;
// reference this file when to use axios
// e.g import axiosInstance from './axiosInstance'
// you can rename it since it is a default export
// so it can be
// import axios from './axiosInstance'

// then to use
// axios.get('/api/user/me/profile')
// axios.post('/api/signup',{userdetails});

// const setHeader = () => {
//   const config = {
//     headers: {
//       Authorization: token,
//       'Content-Type': 'application/json; charset=UTF-8',
//     },
//   };
//   return config;
// };

// const getData = (url: any) => {
//   axios
//     .get(`${baseURL}/${url}`, setHeader())
//     .then((d) => d)
//     .catch((e) => console.log(e.message));
// };

// export default getData;
