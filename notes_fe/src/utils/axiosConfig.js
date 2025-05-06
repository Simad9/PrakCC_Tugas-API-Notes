import axios from 'axios';
import { BASE_URL } from "../utils/utils.js";

// Fungsi untuk mengambil accessToken dari localStorage
const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Fungsi untuk mengambil refreshToken dari cookie
const getRefreshToken = () => {
  const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='));
  return refreshToken ? refreshToken.split('=')[1] : null;
};

// Menambahkan interceptor untuk setiap request
axios.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Menambahkan token ke header Authorization
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Menambahkan interceptor untuk menangani error 401 (token kadaluarsa)
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) { // Token kadaluarsa
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        return Promise.reject(error); // Jika tidak ada refreshToken, langsung reject
      }

      try {
        // Kirim refreshToken untuk mendapatkan accessToken baru
        const response = await axios.post(`${BASE_URL}/refreshToken`, { token: refreshToken });

        // Simpan accessToken baru ke localStorage
        localStorage.setItem('accessToken', response.data.accessToken);

        // Ulangi request yang gagal dengan accessToken baru
        error.config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
        return axios(error.config);
      } catch (err) {
        console.error("Error refreshing token:", err);
        return Promise.reject(err); // Jika gagal refresh token, langsung reject
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
