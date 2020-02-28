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
                const {access_token, expires_in} = res.data;
                if (res.data) {
                    Ls.set('auth.access', access_token);
                    Ls.set('expires_in', expires_in);
                }
                resolve({
                    access_token,
                    expires_in
                })
            }).catch(err => {
                reject(err);
            })
        });
    },
    logout() {
        Ls.remove('auth.access');
        Ls.remove('expires_in');
    }
};
