import axios from 'axios';
import { envVar, Ls } from "../../_helpers";

const SERVER_URL = envVar.get('SERVER_URL');
const CLIENT_ID = envVar.get('CLIENT_ID');
const CLIENT_SECRET = envVar.get('CLIENT_SECRET');
export const authService = {
  login(username, password) {
    return new Promise((resolve, reject) => {
      axios.post(`${SERVER_URL}/oauth/token`, {
        username,
        password,
        grant_type: 'password',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        scope: null
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
  },
  refresh(token) {
    return new Promise((resolve, reject) => {
      axios.post(`${SERVER_URL}/oauth/token`, {
        grant_type: 'refresh_token',
        refresh_token: token,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      }).then(result => {
        resolvePayload(result.data);
        resolve(resolvePayload(result.data));
      }).catch(err => {
        reject(err);
      })
    })
  }
};

// save data to local
function savePayload({access_token, expires_in, refresh_token}) {
  Ls.set('auth.access', access_token);
  Ls.set('auth.refresh', refresh_token);
  Ls.set('auth.expires_in', expires_in);
}

// prepare data for returning the payload to actions
const resolvePayload = ({access_token, expires_in, refresh_token}) => ({
  access: access_token,
  refresh: refresh_token,
  expiresIn: expires_in
});

/**Delete token and relevant info from local storage*/
function removePayload() {
  Ls.remove('auth.access');
  Ls.remove('auth.refresh');
  Ls.remove('auth.expires_in');
}
