import fetchAuthToken from "./fetchAuthToken";

export const fetchBuses = async (company: string, line: string) => {
  const token = await fetchAuthToken();

  const authToken = `Bearer ${token}`;
  const apiRes = await fetch(
    `https://api.montevideo.gub.uy/api/transportepublico/buses?company=${company.toUpperCase()}&lines=${line.toUpperCase()}`,
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
