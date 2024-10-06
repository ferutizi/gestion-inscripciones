import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Se puede obtener desde las variables de entorno
});

//CAMBIAR A URL DEL DEPLOY (SI APLICA)
// baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080', // Se obtiene la URL de las variables de entorno


export default api;
