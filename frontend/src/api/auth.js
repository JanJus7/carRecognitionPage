import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api/";

export const login = (username, password) =>
  axios.post(`${API_URL}login`, { username, password }, { withCredentials: true });

export const register = (username, password) =>
  axios.post(`${API_URL}register`, { username, password }, { withCredentials: true });

export const logout = () => {
  fetch(`${API_URL}logout`, {
    credentials: "include",
  }).then(() => (window.location.href = "/"));
};

export const isAuthenticated = async () => {
  try {
    const res = await fetch(`${API_URL}me`, {
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
};

export const authHeader = () => ({
  withCredentials: true,
});
