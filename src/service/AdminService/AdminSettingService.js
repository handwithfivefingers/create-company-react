import axios from "src/config/axios";

const api_path = {
  getSetting: "/email/setting",
  updateSetting: "/email/setting",
};

const AdminSettingService = {
  getSetting: () => {
    return axios.get(api_path.getSetting);
  },
  updateSetting: (params) => {
    return axios.post(api_path.updateSetting, params);
  },
};

export default AdminSettingService;
