import axios from 'axios';

// for local environment
// export const BASE_URL = 'http://localhost:5700';

export const BASE_URL = 'https://choconotey-api-demo.onrender.com';

export default axios.create({ baseURL: BASE_URL });