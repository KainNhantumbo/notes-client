import axios from 'axios';

export const BASE_URL = 'http://localhost:5700';
// export const BASE_URL = 'https://markdomwn-notes-api.onrender.com';

export default axios.create({ baseURL: BASE_URL });