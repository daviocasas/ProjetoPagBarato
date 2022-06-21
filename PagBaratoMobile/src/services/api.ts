import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ea5f-2804-431-c7f0-aac6-981-aa4a-1dbc-bb8e.sa.ngrok.io'
})

export default api