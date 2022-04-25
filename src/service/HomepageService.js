import axios from "../config/axios";

const api_path = {
  fetchCareer: "/nganhnghe",
};

const HomepageService = {
  fetchCareer: () => {
    return axios.get(api_path.fetchCareer);
  },
};

export default HomepageService;
