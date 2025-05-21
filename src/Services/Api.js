import axios from "axios";

const API_URL = "https://product-orders-8.onrender.com";

// Create a reusable Axios instance with proper headers
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

// Product APIs
export const GetAllProducts = () => axiosInstance.get("/getp");
export const CreateProduct = (product) => axiosInstance.post("/postp", product);

// Order APIs
export const GetAllOrders = () => axiosInstance.get("/getorder");
export const CreateOrder = (order) => axiosInstance.post("/postorder", order);
export const GetOrderById = (id) => axiosInstance.get(`/getbyid/${id}`);
