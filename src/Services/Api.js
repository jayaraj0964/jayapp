import axios from "axios";

const API_URL = "https://product-orders-8.onrender.com";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const GetAllProducts = () => axiosInstance.get("/getp");
export const CreateProduct = (product) => axiosInstance.post("/postp", product);
export const GetAllOrders = () => axiosInstance.get("/getorder");
export const CreateOrder = (order) => axiosInstance.post("/postorder", order);
export const GetOrderById = (id) => axiosInstance.get(`/getbyid/${id}`);