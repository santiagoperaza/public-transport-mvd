"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLineVariant = exports.fetchLineVariants = exports.fetchBusStopUpcomingBuses = exports.fetchBusStopLines = exports.fetchBusStops = exports.fetchBuses = void 0;
const config_1 = __importDefault(require("../config/config"));
const fetchAuthToken_1 = __importDefault(require("./fetchAuthToken"));
const fetchApi = async (path, parameters) => {
    console.log(parameters);
    const { mvdApiBaseUrl } = config_1.default;
    const token = await (0, fetchAuthToken_1.default)();
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
const fetchBuses = async (options) => {
    const parameters = {
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
exports.fetchBuses = fetchBuses;
const fetchBusStops = async () => {
    return fetchApi('buses/busstops');
};
exports.fetchBusStops = fetchBusStops;
const fetchBusStopLines = async (stopId) => {
    return fetchApi(`buses/busstops/${stopId}/lines`);
};
exports.fetchBusStopLines = fetchBusStopLines;
const fetchBusStopUpcomingBuses = async (stopId) => {
    return fetchApi(`buses/busstops/${stopId}/upcomingbuses`);
};
exports.fetchBusStopUpcomingBuses = fetchBusStopUpcomingBuses;
const fetchLineVariants = async () => {
    return fetchApi(`buses/linevariants`);
};
exports.fetchLineVariants = fetchLineVariants;
const fetchLineVariant = async (lineVariantId) => {
    return fetchApi(`buses/linevariants/${lineVariantId}`);
};
exports.fetchLineVariant = fetchLineVariant;
