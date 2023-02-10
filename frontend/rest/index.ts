import axios from "axios";

export const rest = axios.create({
  baseURL: `${process.env.INTERNAL_HOST_BACKEND  || 'http://localhost:3000'}/api`,
});

export default rest;
