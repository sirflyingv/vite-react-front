import { NGW_INSTANCE_URL } from '../config/config';

const baseUrl = NGW_INSTANCE_URL;
const apiUrl = 'api';

export const loginUrl = ['', apiUrl, 'component/auth/login'].join('/');
export const placesUrl = ['', apiUrl, 'resource/56/feature/'].join('/');
export const dataUrl = [baseUrl, apiUrl, 'data'].join('/');
