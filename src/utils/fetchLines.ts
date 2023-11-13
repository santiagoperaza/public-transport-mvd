import fetchAuthToken from "./fetchAuthToken";

export const fetchLines = async (company: string = 'CUTCSA') => {
  const token = await fetchAuthToken();

  const authToken = `Bearer ${token}`;
  const apiRes = await fetch(
    `https://api.montevideo.gub.uy/api/transportepublico/buses?company=${company.toUpperCase()}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: authToken,
      },
    }
  );
  if (!apiRes.ok) {
    throw new Error(`transportepublico/buses fetch failed`);
  }

  return apiRes.json();
};