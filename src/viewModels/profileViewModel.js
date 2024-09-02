
import { ProfileModel } from "../model/ProfileModel";
export const profileViewModel = {
  getPersonalInfo: () => ProfileModel.personalInfo,
  getStats: () => ProfileModel.stats,
  getActivity: () => ProfileModel.activity,
};
