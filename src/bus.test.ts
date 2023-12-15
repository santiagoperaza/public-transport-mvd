'use strict';

import nock from 'nock';
import * as mvdApi from './bus';
import { readFileSync } from 'fs';
import { join } from 'path';
import config from './config/config';

const allBusesResponseData = readFileSync(join(__dirname, 'fixtures', 'bus', 'all.json'), 'utf-8');
const allExpectedBuses = JSON.parse(
  readFileSync(join(__dirname, 'fixtures', 'bus', 'all-expected.json'), 'utf-8')
);
const allBusStopsResponseData = readFileSync(
  join(__dirname, 'fixtures', 'bus', 'all-bus-stops.json'),
  'utf-8'
);
const allExpectedBusStops = JSON.parse(
  readFileSync(join(__dirname, 'fixtures', 'bus', 'all-bus-stops-expected.json'), 'utf-8')
);
const busStopLinesResponseData = readFileSync(
  join(__dirname, 'fixtures', 'bus', 'bus-stop-lines.json'),
  'utf-8'
);
const expectedBusStopLines = JSON.parse(
  readFileSync(join(__dirname, 'fixtures', 'bus', 'bus-stop-lines-expected.json'), 'utf-8')
);

nock(config.mvdApiBaseUrl).get('/buses').once().reply(200, allBusesResponseData);
nock(config.mvdApiBaseUrl).get('/buses/busstops').once().reply(200, allBusStopsResponseData);
nock(config.mvdApiBaseUrl)
  .get(/\/buses\/busstops\/\d+\/lines/)
  .once()
  .reply(200, busStopLinesResponseData);

describe('getBuses', () => {
  test('It should get all buses', async function () {
    const buses = await mvdApi.getBuses();
    expect(buses).toEqual(allExpectedBuses);
  });
});

describe('getBusStops', () => {
  test('It should get all bus stops', async function () {
    const busStops = await mvdApi.getBusStops();
    expect(busStops).toEqual(allExpectedBusStops);
  });
});

describe('getBusStopLines', () => {
  test('It should get all the lines of the specified bus stop', async function () {
    const busStops = await mvdApi.getBusStopLines(546);
    expect(busStops).toEqual(expectedBusStopLines);
  });
});
