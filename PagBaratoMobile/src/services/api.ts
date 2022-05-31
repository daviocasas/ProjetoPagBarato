import axios from 'axios';

const api = axios.create({
    baseURL: 'https://5fa7-2804-431-c7f0-e56c-3427-58bb-eb35-c5aa.sa.ngrok.io'
})

export default api