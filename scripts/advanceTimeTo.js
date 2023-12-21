import '../installSesLockdown.js';
import { initWatcher } from "./helpers.js";
import { OfferSpecs, sendOffer } from "./offers.js";
import { Params } from "./constants.js";

const advanceTimeTo = async () => {
  const timestamp = process.env.TIME || 1n;
  const networkConfig = 'https://xnet.agoric.net/network-config';

  const {
    chainWatcher: {
      watch,
      getState,
      marshaller
    }
  } = await initWatcher(networkConfig);

  watch();
  await getState(['instances']);

  const info = await sendOffer(marshaller, Params, OfferSpecs.Timer({
    timestamp
  }));

  console.log('Success', info);
};

advanceTimeTo()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
