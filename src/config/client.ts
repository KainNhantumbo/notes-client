import axios from 'axios';

export const BASE_URL: any =
  import.meta.env.VITE_LOCAL_BASE_URL ||
  'https://choconotey-api-demo.onrender.com';

export default axios.create({ baseURL: BASE_URL });
