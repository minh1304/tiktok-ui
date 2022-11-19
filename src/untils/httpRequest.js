import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});
export const get = async (path, option = {}) => {
    const response = await request.get(path, option);
    return response.data;
};

export const post = async (uri, data, options = {}) => {
    const response = await request.post(uri, data, options)
    return response.data
  }
export default request;
