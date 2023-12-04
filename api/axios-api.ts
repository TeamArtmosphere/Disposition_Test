import { selectionsType } from '@/recoil/atom';
import axios, { AxiosRequestConfig } from 'axios';

// axios.defaults.withCredentials = true;

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

export const postRegistUser = async (userData: any) => {
  const res = await instance.post(`/api/v1/event-users`, userData);
  return res.data;
};

export const getAllQuestion = async (id?: number) => {
  // const res = await instance.get(`/api/v1/pablos-analysis/${id}`);
  const res = await instance.get(`/api/v1/pablos-analysis/3`);
  return res.data;
};

export const getQuestion = async (id: number) => {
  const res = await instance.get(`/api/v1/pablos-analysis/questions/${id}`);
  return res.data;
};

type selectionsDataType = {
  uid?: string;
  selections: selectionsType[];
};

export const getResult = async (selectionData: selectionsDataType, id?: number) => {
  const res = await instance.post(`/api/v1/pablos-analysis/3/complete`, selectionData);
  return res.data;
};

export const getInterimResult = async (selectionData: selectionsDataType) => {
  const res = await instance.post(`/api/v1/pablos-analysis/3/interim-result`, selectionData);
  return res.data;
};

type ratingUserData = {
  uid: string;
  score: number;
};

export const postRateStar = async (userData: ratingUserData) => {
  const res = await instance.post(`/api/v1/pablos-analysis/3/satisfaction`, userData);
  return res;
};

export const getRecommendLocationList = async (pablosCode: string) => {
  const res = await instance.get(`/api/v1/artmosphere-places?tagNames=${pablosCode}`);
  return res.data;
};

export const getPlaceDetail = async (placeId: string) => {
  const res = await instance.get(`/api/v1/artmosphere-places/${placeId}`);
  return res;
};

export const getPlace = async () => {
  const res = await instance.get(`/api/v1/artmosphere-places`);
  return res.data;
};
