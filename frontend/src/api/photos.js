import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/";

export const getPhotos = () =>
  axios.get(`${API_URL}photos`).then((r) => r.data);

export const uploadPhoto = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return axios.post(`${API_URL}photos`, fd);
};
