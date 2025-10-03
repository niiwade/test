import axios from 'axios';

const myApi = axios.create({baseURL: 'http://localhost:3000/api'});

// export const getTodos = (params : any) => myApi.get()