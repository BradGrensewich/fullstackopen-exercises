import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (title, author, url) => {
  try {
    if (!title || !author || !url) {
      throw error({ message: 'must fill out all inputs' });
    }
    const config = {
      headers: { Authorization: token },
    };
    const blog = { title, author, url };
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const update = async (updatedBlog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const id = updatedBlog.id;
    const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getAll, create, update, setToken };
