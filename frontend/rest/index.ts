import axios, { Axios } from "axios";

export const rest = axios.create({
  baseURL: process.env.REST_LOCALHOST  || 'http://localhost:3000/api',
});

export default rest;
