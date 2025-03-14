import axios from 'axios';
const baseUrl = '/api/login';

const login = async (username, password) => {
  const user = { username, password };
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { login };
