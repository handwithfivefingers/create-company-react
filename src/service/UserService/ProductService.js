import axios from "src/config/axios";

const api_path = {
  create_company: "/order/create",
  createCompanyWithPayment: "/order/create/payment",
};

const ProductService = {
  createCompany: (form) => {
    return axios.post(api_path.create_company, form);
  },
  createCompanyWithPayment: (form) => {
    return axios.post(api_path.createCompanyWithPayment, form);
  },
};

export default ProductService;
