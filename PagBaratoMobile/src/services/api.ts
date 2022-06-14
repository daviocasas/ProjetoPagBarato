import axios from 'axios';

const api = axios.create({
    baseURL: 'https://7a2e-2804-431-c7f0-6d-141b-afa3-83c9-939e.sa.ngrok.io'
})

export default api