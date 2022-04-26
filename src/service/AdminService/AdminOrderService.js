import axios from "src/config/axios";

const api_path = {
  getOrder: "/admin/order",
};

const AdminOrderService = {
  getOrder: (params) => {
    return axios.get(api_path.getOrder, { params });
  },
  getOrderBySlug: (params) => {
    return axios.get(`${api_path.getOrder}/${params.slug}`);
  },
};

export default AdminOrderService;
