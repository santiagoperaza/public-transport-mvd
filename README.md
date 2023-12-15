## Node.js module to gather data of MVD Public Transport API

[Link to MVD API](https://api.montevideo.gub.uy/apidocs/publictransport)

## 🚍 MVD Bus

Examples

#### CommonJS

```
const { getBuses } = require('public-transport-mvd');

(async () => {
const result = await getBuses({ lines: ['60', '64', '128'] });
console.log(result);
})();

```

This will print:

```
[
  {
    id: 1039,
    company: 'CUTCSA',
    line: '60',
    timestamp: '2023-12-06T17:16:25.000-03',
    origin: 'PLAZA INDEPENDENCIA',
    destination: 'PORTONES',
    location: { type: 'Point', coordinates: [Array] },
    special: false
  },
  {
    id: 281,
    company: 'CUTCSA',
    line: '60',
    timestamp: '2023-12-06T17:16:14.000-03',
    origin: 'C. VIEJA',
    destination: 'PORTONES',
    location: { type: 'Point', coordinates: [Array] },
    special: false
  },
  {
    id: 954,
    company: 'CUTCSA',
    line: '64',
    timestamp: '2023-12-06T17:16:34.000-03',
    origin: 'PORTONES',
    destination: 'TRES CRUCES',
    location: { type: 'Point', coordinates: [Array] },
    special: false
  }
]
```

Default export is also supported.

```
const mvdApi = require('public-transport-mvd');
```

#### ESM

Default export:

```
import * as mvdApi from 'public-transport-mvd';
```

Named exports:

```
import { getBuses, getBusStops, getBusStopLines } from 'public-transport-mvd';
```
