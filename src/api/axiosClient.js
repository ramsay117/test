import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const countriesClient = axios.create({
  baseURL: 'https://countriesnow.space/api/v0.1/countries',
  headers: {
    'Content-Type': 'application/json',
  },
});
