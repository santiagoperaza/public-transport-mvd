import 'dotenv/config';
import { Buffer } from 'buffer';
import config from '../config/config';

const fetchAuthToken = async (): Promise<string> => {
  const { clientId, clientSecret, mvdApiAuthUrl } = config;
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(mvdApiAuthUrl, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  });
  const token = await response.json();
  return token.access_token as string;
};

export default fetchAuthToken;
