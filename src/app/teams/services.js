import { apiService, apiUrls } from "../../services";

export const service = {
  getTeamList() {
    return apiService.get(apiUrls.API.TEAMS);
  }
};