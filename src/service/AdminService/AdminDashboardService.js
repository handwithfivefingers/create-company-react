import axios from "src/config/axios";

const api_path = {
  getLogs: "/admin/logs",
};

const AdminDashboardService = {
  getLogs: () => {
    return axios.get(api_path.getLogs);
  },
};

export default AdminDashboardService;
