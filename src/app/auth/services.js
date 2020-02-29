import axios from 'axios';
import { envVar, Ls } from "../../_helpers";

const SERVER_URL = envVar.get('SERVER_URL');

export const authService = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      axios.post(`${SERVER_URL}/oauth/login`, {
        email,
        password,
      }).then(res => {
        if (res.data) {
          savePayload(res.data)
        }
        resolve(resolvePayload(res.data));
      }).catch(err => {
        reject(err);
      })
    });
  },
  logout() {
    return new Promise((resolve, reject) => {
      axios.post(`${SERVER_URL}/oauth/logout`).then(() => {
        resolve();
      }).catch(err => {
        reject(err);
      }).finally(() => {
        removePayload();
      })
    })
  }
};

// save data to local
function savePayload({access_token, expires_at, refresh_token}) {
  Ls.set('auth.access', access_token);
  Ls.set('auth.refresh', refresh_token);
  Ls.set('auth.expires_at', expires_at);
}

// prepare data for returning the payload to actions
const resolvePayload = ({access_token, expires_at, refresh_token}) => ({
  access: access_token,
  refresh: refresh_token,
  expiresAt: expires_at
});

/**Delete token and relevant info from local storage*/
function removePayload() {
  Ls.remove('auth.access');
  Ls.remove('auth.refresh');
  Ls.remove('auth.expires_at');
}
