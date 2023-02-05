import axios from "axios";

// IP máquina na Rede Local e não o localhost (funcionamento android)
export const api = axios.create({
    baseURL: 'http://192.168.0.108:3333'
})