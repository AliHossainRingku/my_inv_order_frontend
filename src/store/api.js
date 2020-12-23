import axios from 'axios'
export default (method, url, data = null) => {
  return new Promise((resolve, reject) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:8000';
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('im_token');
    axios({
        method,
        url,
        data
      })
      .then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      })
  })
};
