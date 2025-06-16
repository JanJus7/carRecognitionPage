import axios from "axios";
import { authHeader } from "./auth";

const API_URL = import.meta.env.VITE_API_URL || "/api/";

export const getPhotos = () =>
  axios.get(`${API_URL}photos`, authHeader()).then((r) => r.data);

export const uploadPhoto = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return axios.post(`${API_URL}photos`, fd, authHeader());
};
