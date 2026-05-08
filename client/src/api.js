import axios from "axios";

const API = axios.create({
  baseURL: "https://task-4-mxoi.onrender.com/api",
});

export default API;