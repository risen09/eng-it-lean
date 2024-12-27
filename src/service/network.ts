import axios from 'axios';
import { getConfigValue } from '@brojs/cli';

const baseUrl = getConfigValue('eng-it-lean.api');

export const network = axios.create({ baseURL: baseUrl });
