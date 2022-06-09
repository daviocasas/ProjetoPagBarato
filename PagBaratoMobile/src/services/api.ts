import axios from 'axios';

const api = axios.create({
    baseURL: 'https://b7c7-2804-431-c7f1-c0d5-647a-a72d-14e8-cf20.sa.ngrok.io'
})

export default api