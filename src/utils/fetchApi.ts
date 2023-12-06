import { GetAllBusesDataOptions } from '../bus';
import config from '../config/config';
import fetchAuthToken from './fetchAuthToken';

const fetchApi = async (path: string, parameters?: Record<string, string>) => {
  console.log(parameters);
  const { mvdApiBaseUrl } = config;
  const token = await fetchAuthToken();

  const authToken = `Bearer ${token}`;

  const url = parameters
    ? `${mvdApiBaseUrl}/${path}?` + new URLSearchParams(parameters).toString()
    : `${mvdApiBaseUrl}/${path}`;
  const apiRes = await fetch(url, {
    headers: {
      'Content-type': 'application/json',
      Authorization: authToken
    }
  });
  if (!apiRes.ok) {
    throw new Error(`${path} fetch failed`);
  }

  return apiRes.json();
};

export const fetchBuses = async (options?: GetAllBusesDataOptions) => {
  const parameters: Record<string, string> = {
    ...(options?.company && { company: options?.company?.toUpperCase() }),
    ...(options?.busid && { busId: options?.busid.toString() }),
    ...(options?.busstopid && { busstopid: options?.busstopid.toString() }),
    ...(options?.lines && { lines: options?.lines.toString() }),
    ...(options?.linevariantsids && {
      linevariantsids: options?.linevariantsids.toString()
    })
  };
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
