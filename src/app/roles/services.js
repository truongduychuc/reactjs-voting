import { apiService, apiUrls } from "../../services";

export const roleService = {
  getRoleOptions() {
    return apiService.getData(apiUrls.API.ROLE_FILTER_PROVIDER);
  }
};
