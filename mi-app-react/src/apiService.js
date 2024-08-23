import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Reemplaza con la URL de tu backend si es diferente
});

export default api;