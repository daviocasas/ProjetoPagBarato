import axios from 'axios';

const api = axios.create({
    baseURL: 'https://28e0-2804-14c-3bb0-104f-6c36-873c-1801-7f2d.sa.ngrok.io'
})

export default api