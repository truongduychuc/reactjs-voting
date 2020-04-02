import { envVar } from "../_helpers";

const SERVER_ROOT_URL = envVar.get('SERVER_URL');

class ApiUrls {
  API = {};
  apis = {
    USERS: '/api/users',
    USER_ID: '/api/users/',
    CREATE_USER: 'api/users',
    TEAMS: '/api/teams',
    TEAM_ID: '/api/teams/',
    UPDATE_PROFILE: '/api/user/actions/update-profile',
    CHANGE_STATUS_USER: '/api/user/actions/change-status/',
    CURRENT_AUTH_USER: '/api/user/current',
    AWARDS: '/api/awards',
    AWARD_ID: '/api/awards/',
    LOGIN: '/oauth/token',
    LOGOUT: '/oauth/logout',
    ROLE_FILTER_PROVIDER: '/api/user/role-form-resolver',
    EMAIL_EXIST: '/api/user/email-exist/',
    USERNAME_EXIST: '/api/user/username-exist/',
    GENDERS: '/api/user/genders'
  };

  constructor() {
    Object.keys(this.apis).forEach(key => {
      if (typeof this.apis[key] !== 'string') {
      } else {
        let server = SERVER_ROOT_URL;
        if (!SERVER_ROOT_URL.endsWith('/') && !this.apis[key].startsWith('/')) {
          server += '/';
        }
        this.API[key] = server + this.apis[key];
      }
    });
  }
}

export const apiUrls = new ApiUrls();
