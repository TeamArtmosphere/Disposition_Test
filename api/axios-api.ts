import axios, { AxiosRequestConfig } from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'https://e8d1-175-214-81-205.ngrok-free.app';

export const instance = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // 'ngrok-skip-browser-warning': 'abc',
  },
});

export const postRegistUser = async (userData: any) => {
  const res = await instance.post(`/api/v1/event-users`, userData);
  return res.data;
};

export const getQuestion = async (id: number) => {
  const res = await instance.get(`/api/v1/pablos-analysis/${id}`);
  return res.data;
};

// export const accessInstance = axios.create({
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8',
//   },
// });

// accessInstance.interceptors.request.use((config: any) => {
//   config.headers = {
//     ...config.headers,
//     Authorization: `Bearer ${Cookies.getCookie('access_token')}`,
//   };

//   return config;
// });
