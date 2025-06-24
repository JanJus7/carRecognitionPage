import axios from "axios";
import { authHeader } from "./auth";

const API_URL = import.meta.env.VITE_API_URL || "/api/";

export const getPhotos = () =>
  axios.get(`${API_URL}photos`, authHeader()).then((r) => r.data);

export const uploadPhoto = async (file) => {
  const fd = new FormData();
  fd.append("file", file);
  const response = await axios.post(`${API_URL}photos`, fd, authHeader());
  return response.data;
};
