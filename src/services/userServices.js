import { apiService } from "./api";
import { apiUrls } from "./apiUrls";

export const userServices = {
  getTeamList() {
    return apiService.getData(apiUrls.API.TEAMS);
  }
};