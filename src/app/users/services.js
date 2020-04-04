import { apiService, apiUrls } from "../../services";
import { _apiHelper } from "../../_helpers";

const userService = {
  createNew(data) {
    return apiService.post(apiUrls.API.CREATE_USER, data);
  },
  getDisplayedName(firstName = '', lastName = '', englishName = '') {
    const SPACE_SEPARATOR = ' ';
    const DOT_SEPARATOR = '.';
    let transformedLastName = lastName;
    if (lastName !== '') {
      const lastNameSplited = lastName.split(SPACE_SEPARATOR);
      const mainLastName = lastNameSplited.shift();
      const surNameArr = lastNameSplited.map(name => name.substr(0, 1));
      const surName = surNameArr.join(DOT_SEPARATOR);
      transformedLastName = surName ? surName.concat(DOT_SEPARATOR + SPACE_SEPARATOR + mainLastName) : mainLastName;
    }
    if (!englishName) {
      return firstName + SPACE_SEPARATOR + transformedLastName.toUpperCase().replace(/\s+/g, SPACE_SEPARATOR);
    }
    const transformedFirstName = firstName ? firstName + SPACE_SEPARATOR : '';
    const transformedEnglishName = englishName ? '(' + englishName + ')' : '';
    return (transformedFirstName + transformedEnglishName + SPACE_SEPARATOR + transformedLastName.toUpperCase()).replace(/\s+/g, SPACE_SEPARATOR);
  },
  /**
   * @param username string
   * */
  checkExistUserName(username) {
    const url = _apiHelper.mapUrlWithParam(apiUrls.API.USERNAME_EXIST, username);
    return apiService.getData(url);
  },
  checkExistEmail(email) {
    const url = _apiHelper.mapUrlWithParam(apiUrls.API.EMAIL_EXIST, email);
    return apiService.getData(url);
  },
  getGenderOptions() {
    return apiService.getData(apiUrls.API.GENDERS);
  },
  changePassword(data) {
    return apiService.patch(apiUrls.API.CHANGE_PASSWORD, data);
  }
};

export {
  userService
}
