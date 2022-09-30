import axios from 'axios';

const api = axios.create({
    baseURL: 'https://18.231.114.96.nip.io'
})

export default api