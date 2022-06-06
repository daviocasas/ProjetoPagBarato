import axios from 'axios';

const api = axios.create({
    baseURL: 'https://e561-2804-431-c7f0-e56c-1c08-544c-b2b1-fdfa.sa.ngrok.io'
})

export default api