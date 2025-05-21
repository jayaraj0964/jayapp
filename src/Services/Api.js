import axios from 'axios';

const API_URL = 'https://product-orders-8.onrender.com';

// Product APIs
export const GetAllProducts = () => axios.get(`${API_URL}/getp`);
export const CreateProduct = (product) => axios.post(`${API_URL}/postp`, product);

// Order APIs (Updated paths)
export const GetAllOrders = () => axios.get(`${API_URL}/getorder`);
export const CreateOrder = (order) => axios.post(`${API_URL}/postorder`, order);
export const GetOrderById = (id) => axios.get(`${API_URL}/getbyid/${id}`);

// Axios Instance (for global headers if needed)
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${API_KEY}` // Uncomment if API key is required
  }
});
