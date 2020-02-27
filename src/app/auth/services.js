import axios from 'axios';
import Ls from '../../_helpers/ls';

export const authService = {
    login(username, password) {
        return axios.post(`${process.env.MIX_APP_URL}/oauth/token`, {
            username,
            password,
            grant_type: 'password',
            scope: null,
            client_id: process.env.MIX_CLIENT_ID,
            client_secret: process.env.MIX_CLIENT_SECRET
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
