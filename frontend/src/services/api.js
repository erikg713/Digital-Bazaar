import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const token = localStorage.getItem('pi_token');

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

// Re-authenticate token on each call if needed
const setAuthToken = () => {
  const token = localStorage.getItem('pi_token');
  if (token) {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
};

// Fetch all items from the marketplace
export const fetchItems = async () => {
  setAuthToken();
  const res = await axiosInstance.get('/items');
  return res.data;
};

// Purchase an item
export const buyItem = async (itemId) => {
  setAuthToken();
  const res = await axiosInstance.post(`/items/${itemId}/purchase`);
  return res.data;
};

// Get items owned by the logged-in Pi user
export const getUserItems = async () => {
  setAuthToken();
  const res = await axiosInstance.get('/user/items');
  return res.data;
};

// Create a new item (admin or marketplace creator role)
export const createItem = async (itemData) => {
  setAuthToken();
  const res = await axiosInstance.post('/items', itemData);
  return res.data;
};

// Optional: Login handler to save token (used after Pi SDK auth)
export const loginUser = async (piUser) => {
  const res = await axiosInstance.post('/auth/login', { username: piUser.username });
  localStorage.setItem('pi_token', res.data.token);
  return res.data;
};
