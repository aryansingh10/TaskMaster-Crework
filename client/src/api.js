import axios from 'axios';

const api = axios.create({
    baseURL: 'https://task-master-six-nu.vercel.app/',
});

export default api;
