import { fetchBuses, fetchBusStops, fetchBusStopLines } from "./utils/fetchApi"

interface GetAllBusStopsResponse {
  busstopId: number
  street1: string
  street2: string
  street1Id: number
  street2Id: number
  location: Location
}

interface GetAllBusStopsLinesResponse {
  lineId: number
  line: string
}

export interface GetAllBusesDataOptions {
  readonly company?: string,
  readonly linevariantsids?: number[]
  readonly busid?: number,
  readonly busstopid?: number,
  readonly lines?: string[]
}

interface GetAllBusesDataResponse {
  company: string,
  timestamp: string,
  busId: number,
  line: string,
  lineVariantId: number,
  location: Location,
  origin: string,
  destination: string,
  subline: string,
  special: boolean
}

interface Line {
  id: number,
  line: string
}

interface Bus {
  id: number,
  company: string,
  timestamp: string,
  line: string,
  location: Location,
  origin: string,
  destination: string,
  special: boolean
}

interface BusStop {
  id: number
  street1: string
  street2: string
  street1Id: number
  street2Id: number
  location: Location
}

interface Location {
  type: string
  coordinates: [number, number]
}

export async function getBuses(options?: GetAllBusesDataOptions): Promise<Array<Bus>> {
  const buses = await fetchBuses(options) as Array<GetAllBusesDataResponse>;
  const results: Array<Bus> = buses.map(bus => ({
    id: bus.busId,
    company: bus.company,
    line: bus.line,
    timestamp: bus.timestamp,
    origin: bus.origin,
    destination: bus.destination,
    location: bus.location,
    special: bus.special
  }));
  return results;
}

export async function getBusStops(): Promise<Array<BusStop>> {
  const busStops = await fetchBusStops() as Array<GetAllBusStopsResponse>;
  const results: Array<BusStop> = busStops.map(stop => ({
    id: stop.busstopId,
    street1: stop.street1,
    street2: stop.street2,
    street1Id: stop.street1Id,
    street2Id: stop.street2Id,
    location: stop.location
  }));
  return results;
}

export async function getBusStopLines(stopId: number): Promise<Array<Line>> {
  const lines = await fetchBusStopLines(stopId) as Array<GetAllBusStopsLinesResponse>;
  const results: Array<Line> = lines.map(line => ({
    id: line.lineId,
    line: line.line,
  }));
  return results;
}

export default {
  getBusStops,
  getBuses
}