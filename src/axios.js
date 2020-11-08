import axios from 'axios';

const port = 4000;
const baseUrl = `http://192.168.0.158:${port}`;

export const URL = baseUrl + '/api';
export const WSURL = baseUrl + '/manipulatorSocket';

export default axios.create({
  baseURL: URL,
});
