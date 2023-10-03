import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'http://52.79.94.115:8080';

export const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'ngrok-skip-browser-warning': 'abc',
    // 'Access-Control-Allow-Origin': '*',
  },
});

export const postRegistUser = async (userData: any) => {
  const res = await instance.post(`/api/v1/event-users`, userData);
  return res.data;
};

export const getAllQuestion = async (id: number) => {
  const res = await instance.get(`/api/v1/pablos-analysis/${id}`);
  return res.data;
};

export const getQuestion = async (id: number) => {
  const res = await instance.get(`/api/v1/pablos-analysis/questions/${id}`);
  return res.data;
};
