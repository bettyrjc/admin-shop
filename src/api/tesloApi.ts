import axios from 'axios';

const tesloApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export { tesloApi };
