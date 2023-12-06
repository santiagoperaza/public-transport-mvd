"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusStopLines = exports.getBusStops = exports.getBuses = void 0;
const fetchApi_1 = require("./utils/fetchApi");
async function getBuses(options) {
    const buses = (await (0, fetchApi_1.fetchBuses)(options));
    const results = buses.map(bus => ({
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
exports.getBuses = getBuses;
async function getBusStops() {
    const busStops = (await (0, fetchApi_1.fetchBusStops)());
    const results = busStops.map(stop => ({
        id: stop.busstopId,
        street1: stop.street1,
        street2: stop.street2,
        street1Id: stop.street1Id,
        street2Id: stop.street2Id,
        location: stop.location
    }));
    return results;
}
exports.getBusStops = getBusStops;
async function getBusStopLines(stopId) {
    const lines = (await (0, fetchApi_1.fetchBusStopLines)(stopId));
    const results = lines.map(line => ({
        id: line.lineId,
        line: line.line
    }));
    return results;
}
exports.getBusStopLines = getBusStopLines;
exports.default = {
    getBusStops,
    getBuses
};
