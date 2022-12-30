import axios from 'axios';
import log from 'loglevel';

log.setLevel(log.levels.DEBUG);
log.debug('log debug');
log.debug(import.meta.env);

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api/graphql`,
});

export default axiosInstance;
