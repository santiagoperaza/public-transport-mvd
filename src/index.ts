import { getBuses } from './bus';

(async () => {
  const result = await getBuses({ busid: 714 });
  console.log(result);
})();
