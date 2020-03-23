import { apiService, apiUrls } from "../../services";

const userService = {
  createNew(data) {
    return apiService.post(apiUrls.API.CREATE_USER, data);
  }
};

export {
  userService
}