import '../installSesLockdown.js';
import { initWatcher } from "./helpers.js";
import { OfferSpecs, sendOffer } from "./offers.js";
import { BidKeyword, CollateralKeyword, Params } from "./constants.js";
import { floorDivideBy, makeRatioFromAmounts } from "../_agstate/yarn-links/@agoric/zoe/src/contractSupport/index.js";
import { AmountMath } from "../_agstate/yarn-links/@agoric/ertp/src/index.js";

const makeBid = async () => {
  const priceVal = process.env.PRICE_VAL || 7_850_000n;
  const bidVal = process.env.BID_VAL || 10_000_000n;

  const networkConfig = 'https://xnet.agoric.net/network-config';
  const {
    chainWatcher: {
      watch,
      getState,
      marshaller
    }
  } = await initWatcher(networkConfig);

  watch();
  const { brands } = await getState(['brands']);
  console.log({ brands });

  const priceDenomAmount = AmountMath.make(brands[CollateralKeyword], 1_000_000n);
  const priceNumAmount = AmountMath.make(brands[BidKeyword], priceVal);
  const price = makeRatioFromAmounts(priceNumAmount, priceDenomAmount);

  const bidAmount = AmountMath.make(brands[BidKeyword], bidVal);
  const maxColAmount = floorDivideBy(bidAmount, price);

  const info = await sendOffer(marshaller, Params, OfferSpecs.Bid({
    maxColAmount,
    bidAmount,
    price
  }));

  console.log('Success', info);
};

makeBid()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
