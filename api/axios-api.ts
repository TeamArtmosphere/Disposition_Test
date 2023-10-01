import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'https://e8d1-175-214-81-205.ngrok-free.app';

export const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'ngrok-skip-browser-warning': 'abc',
    // 'Access-Control-Allow-Origin': '*',
  },
});

export const postRegistUser = async (userData: any) => {
  const res = await instance.post(`/api/v1/event-users`, userData);
  // const res = await instance.post(`${API_URL}/api/v1/event-users`, userData);
  return res.data;
};

export const getAllQuestion = async (id: number) => {
  const res = await instance.get(`/api/v1/pablos-analysis/${id}`);
  // const res = await instance.get(`${API_URL}/api/v1/pablos-analysis/${id}`);
  return res.data;
};

export const getQuestion = async (id: number) => {
  const res = await instance.get(`/api/v1/pablos-analysis/questions/${id}`);
  // const res = await instance.get(`${API_URL}/api/v1/pablos-analysis/${id}`);
  return res.data;
};
