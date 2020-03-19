import axios from 'axios';

export class ApiService {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

// get data only
  getData(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then(res => {
        resolve(res.data.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  post(url, data, options) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  patch(url, data, options) {
    return new Promise((resolve, reject) => {
      axios.patch(url, data).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      })
    })
  }

  put(url, data, options) {
    return new Promise((resolve, reject) => {
      axios.put(url, data).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      })
    })
  }
}

export const apiService = new ApiService();
