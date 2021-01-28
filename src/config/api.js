import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fts-gustavo-tp.herokuapp.com'
});

export default api;