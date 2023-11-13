import 'dotenv/config'
import { Buffer } from 'buffer';

const fetchAuthToken = async (): Promise<string> => {
  let basicAuth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");
  const response = await fetch(
    "https://mvdapi-auth.montevideo.gub.uy/auth/realms/pci/protocol/openid-connect/token",
    {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization:
        `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    }
  );
  const token = await response.json() as any;
  return token.access_token as string;
};

export default fetchAuthToken;
