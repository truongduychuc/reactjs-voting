import axios from 'axios';
import Ls from '../../_helpers/ls';

export const authService = {
  login(email, password) {
    return axios.post(`${process.env.REACT_APP_SERVER_URL}/oauth/token`, {
      email,
      password,
      grant_type: 'password',
      scope: null,
      client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
      client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET
    }).then(res => {
      const {access_token, expires_in} = res.data;
      if (res.data) {
        Ls.set('auth.access', access_token);
        Ls.set('expires_in', expires_in);
      }
      return res.data;
    }).catch(err => {
      console.log(err.message);
      return {};
    })
  },
  logout() {
    Ls.remove('auth.access');
    Ls.remove('expires_in');
  }
};
