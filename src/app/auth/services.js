import axios from 'axios';
import { envVar, Ls } from "../../_helpers";

export const authService = {
    login(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${envVar.get('SERVER_URL')}/oauth/token`, {
                username,
                password,
                grant_type: 'password',
                scope: null,
                client_id: envVar.get('CLIENT_ID')  ,
                client_secret: envVar.get('CLIENT_SECRET')
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
    Ls.remove('auth.access');
    Ls.remove('auth.refresh');
    Ls.remove('auth.expires_in');
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
