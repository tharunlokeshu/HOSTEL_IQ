import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pragati-hostel.onrender.com/api/register/', // change if deployed
});

export default instance;
