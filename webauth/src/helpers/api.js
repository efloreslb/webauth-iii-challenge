import axios from 'axios';

const instance = axios.create({
   baseURL: 'http://localhost:6000/api',
})

instance.interceptors.request.use(
   (config) => {
      config.headers.authorization = localStorage.getItem('token');
      return config;
   },
   (err) => {
      return Promise.reject(err);
   }
)

export default instance;