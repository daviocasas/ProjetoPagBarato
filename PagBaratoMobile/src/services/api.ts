import axios from 'axios';

const api = axios.create({
    baseURL: 'https://37b0-2804-14c-483-9298-1ca6-98ea-c0d6-5131.sa.ngrok.io'
})

export default api