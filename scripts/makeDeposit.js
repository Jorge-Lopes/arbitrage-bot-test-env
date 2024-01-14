import '../installSesLockdown.js';
import { initWatcher } from "./helpers.js";
import { OfferSpecs, sendOffer } from "./offers.js";
import { CollateralKeyword, Params } from "./constants.js";
import { AmountMath } from "../_agstate/yarn-links/@agoric/ertp/src/index.js";

const makeDeposit = async () => {
  const depositVal = process.env.DEPOSIT_VAL || 50_000_000;
  const networkConfig = 'https://wallet.agoric.app/wallet/network-config';

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

  const collateralAmount = AmountMath.make(brands[CollateralKeyword], BigInt(depositVal));

  const info = await sendOffer(
    marshaller,
    { ...Params, key: 'user1' },
    OfferSpecs.Deposit({ collateralAmount, goal: process.env.GOAL_VAL ? AmountMath.make(brands['IST'], BigInt(process.env.GOAL_VAL)) : undefined })
  );

  console.log('Success', info);
};

makeDeposit()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
