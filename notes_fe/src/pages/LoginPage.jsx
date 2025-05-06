import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from '../utils/axiosConfig'; // Import axiosConfig
import { BASE_URL } from "../utils/utils.js";
import PropTypes from 'prop-types';


const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Logic untuk autentikasi login
    console.log("Login with", { username, password });
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json", // Pastikan headernya benar
          },
        }
      );
      if (response.data) {
        // Simpan accessToken di localStorage
        localStorage.setItem('accessToken', response.data.accessToken);

        // Simpan refreshToken di cookie (httpOnly, secure, SameSite=Strict)
        document.cookie = `refreshToken=${response.data.refreshToken}; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=86400`;

        // Ubah status autentikasi
        setIsAuthenticated(true);

        // Arahkan ke halaman notes setelah login berhasil
        navigate("/notes");
      } else {
        alert("Login failed. No data in response.");
      }
    } catch (error) {
      // Log error untuk debug
      console.error("Login Error:", error.response ? error.response.data : error.message);
      alert("Login failed: " + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Belum punya Akun?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Daftar Disini
          </Link>
        </p>
      </div>
    </div>
  );
};

// Validasi prop 'setIsAuthenticated'
LoginPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired, // Menambahkan validasi tipe prop
};

export default LoginPage;
