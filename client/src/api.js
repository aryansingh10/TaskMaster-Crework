import axios from 'axios';

const api = axios.create({
    baseURL: 'https://task-master-six-nu.vercel.app/api',
});
// You have  to use your own URL from the backend or localhost:5000/api

export default api;
