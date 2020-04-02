import axios from 'axios';
import {envVar, Ls} from "../../_helpers";
import {ApiService, apiUrls} from "../../services";
import { payloadKeys } from "./types";

const CLIENT_ID = envVar.get('CLIENT_ID');
const CLIENT_SECRET = envVar.get('CLIENT_SECRET');

class AuthService extends ApiService {
    login(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(apiUrls.API.LOGIN, {
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
    }
    logout() {
        return new Promise((resolve, reject) => {
            axios.post(apiUrls.API.LOGOUT).then(() => {
                resolve();
            }).catch(err => {
                reject(err);
            }).finally(() => {
                removePayload();
            })
        })
    }
    refresh(token) {
        return new Promise((resolve, reject) => {
            axios.post(apiUrls.LOGIN, {
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
}

export const authService = new AuthService();

// save data to local
function savePayload({access_token, expires_in, refresh_token}) {
    Ls.set(payloadKeys.TOKEN, access_token);
    Ls.set(payloadKeys.REFRESH_TOKEN, refresh_token);
    Ls.set(payloadKeys.EXPIRES, expires_in);
}

// prepare data for returning the payload to actions
const resolvePayload = ({access_token, expires_in, refresh_token}) => ({
    access: access_token,
    refresh: refresh_token,
    expiresIn: expires_in
});

/**Delete token and relevant info from local storage*/
function removePayload() {
    Ls.remove(payloadKeys.TOKEN);
    Ls.remove(payloadKeys.REFRESH_TOKEN);
    Ls.remove(payloadKeys.EXPIRES);
}
