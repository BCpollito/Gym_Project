import axios from "axios";

const BASE_PATH = import.meta.env.VITE_PUBLIC_URL_BACKEND ?? 'http://localhost:3000';

axios.defaults.baseURL = BASE_PATH;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';