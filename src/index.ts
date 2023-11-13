import { fetchBuses } from "./utils/fetchBuses";
import { fetchLines } from "./utils/fetchLines";

(async () => {
  const lines = await fetchLines();
  console.log(lines);
})()