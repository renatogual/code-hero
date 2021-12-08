import axios from "axios";

export const api = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public",
  headers: {
    Accept: "application/json",
  },
  timeout: 30000,
  params: {
    ts: 1,
    apikey: process.env.REACT_APP_API_KEY,
  },
});
