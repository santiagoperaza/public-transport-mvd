import { GetAllBusesDataOptions } from "../bus";
import config from "../config/config";
import fetchAuthToken from "./fetchAuthToken";

const fetchApi = async (path: string, parameters?: Map<string, any>) => {
  const { mvdApiBaseUrl } = config;
  const token = await fetchAuthToken(); 

  const authToken = `Bearer ${token}`;
  const apiRes = await fetch(
    `${mvdApiBaseUrl}/${path}?` + new URLSearchParams(Object.fromEntries(parameters!!)).toString(),
    {
      headers: {
        "Content-type": "application/json",
        Authorization: authToken,
      },
    }
  );
  if (!apiRes.ok) {
    throw new Error(`${path} fetch failed`);
  }

  return apiRes.json();
};


export const fetchBuses = async (options?: GetAllBusesDataOptions) => {
  let parameters = new Map<string, any>();
  parameters.set('company', options?.company?.toUpperCase());
  parameters.set('busId', options?.busid);
  parameters.set('busstopid', options?.busstopid);
  parameters.set('lines', options?.lines);
  parameters.set('linevariantsids', options?.linevariantsids);
  return fetchApi('buses', parameters);
};

export const fetchBusStops = async () => {
  return fetchApi('buses/busstops');
};

export const fetchBusStopLines = async (stopId: number) => {
  return fetchApi(`buses/busstops/${stopId}/lines`);
};

export const fetchBusStopUpcomingBuses = async (stopId: number) => {
  return fetchApi(`buses/busstops/${stopId}/upcomingbuses`);
};

export const fetchLineVariants = async () => {
  return fetchApi(`buses/linevariants`);
};

export const fetchLineVariant = async (lineVariantId: number) => {
  return fetchApi(`buses/linevariants/${lineVariantId}`);
};