import axios from 'axios';

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params}).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
}
function post(url, data, options) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
}
function patch(url, data, options) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
}
function put(url, data, options) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err);
    })
  })
}

const apiService = {
  get,
  post,
  put,
  patch
};

export default apiService;
