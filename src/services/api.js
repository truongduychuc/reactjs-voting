import axios from 'axios';
import {errorService} from './error';
import {consumers as errorConsumers} from "../app/errors";

export class ApiService {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then(res => {
        resolve(res.data);
      }).catch(err => {
        const _error = errorService.transformErrorResponse(err);
        errorConsumers.add(_error);
        reject(_error);
      })
    })
  }

// get data only
  getData(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {params}).then(res => {
        resolve(res.data.data);
      }).catch(err => {
        const _error = errorService.transformErrorResponse(err);
        errorConsumers.add(_error);
        reject(_error);
      })
    })
  }

  post(url, data, options) {
    return new Promise((resolve, reject) => {
      axios.post(url, data).then(res => {
        resolve(res.data);
      }).catch(err => {
        const _error = errorService.transformErrorResponse(err);
        errorConsumers.add(_error);
        reject(_error);
      })
    })
  }

  patch(url, data, options) {
    return new Promise((resolve, reject) => {
      axios.patch(url, data).then(res => {
        resolve(res.data);
      }).catch(err => {
        const _error = errorService.transformErrorResponse(err);
        errorConsumers.add(_error);
        reject(_error);
      })
    })
  }

  put(url, data, options) {
    return new Promise((resolve, reject) => {
      axios.put(url, data).then(res => {
        resolve(res.data);
      }).catch(err => {
        const _error = errorService.transformErrorResponse(err);
        errorConsumers.add(_error);
        reject(_error);
      })
    })
  }
}

export const apiService = new ApiService();
