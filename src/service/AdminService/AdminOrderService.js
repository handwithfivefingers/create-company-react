import axios from "src/config/axios";

const api_path = {
  getOrder: "/admin/orders",
};

const AdminOrderService = {
  getOrder: (params) => {
    return axios.get(api_path.getOrder, { params });
  },
};

export default AdminOrderService;
