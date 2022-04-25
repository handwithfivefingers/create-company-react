import axios from "./../../config/axios";

const api_path = {
  getUser: "/admin/user",
};

const AdminUserService = {
  getUser: () => {
    return axios.get(api_path.getUser);
  },
};

export default AdminUserService;
