import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  clientId: process.env.MVD_API_CLIENT_ID,
  clientSecret: process.env.MVD_API_CLIENT_SECRET,
  mvdApiBaseUrl:
    process.env.MVD_API_BASE_URL ||
    'https://api.montevideo.gub.uy/api/transportepublico',
  mvdApiAuthUrl:
    process.env.MVD_API_AUTH_URL ||
    'https://mvdapi-auth.montevideo.gub.uy/auth/realms/pci/protocol/openid-connect/token'
};

console.debug(`configuration: ${JSON.stringify(config, null, 2)}`);

export default config;
