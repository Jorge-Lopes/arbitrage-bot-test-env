import "../installSesLockdown.js";
import { initWatcher } from "./helpers.js";
import { OfferSpecs, sendOffer } from "./offers.js";
import { CollateralKeyword, Params } from "./constants.js";
import { AmountMath } from "../_agstate/yarn-links/@agoric/ertp/src/index.js";

const mintAtom = async () => {
  const mintVal = process.env.MINT_VAL || 50_000_000n;
  const networkConfig = "https://wallet.agoric.app/wallet/network-config";

  const {
    chainWatcher: { watch, getState, marshaller },
  } = await initWatcher(networkConfig);

  watch();
  const { brands } = await getState(["brands"]);
  console.log({ brands });

  const mintAmount = AmountMath.make(brands[CollateralKeyword], mintVal);

  const info = await sendOffer(
    marshaller,
    { ...Params, key: 'user1' },
    OfferSpecs.MintAtom({
      amount: mintAmount,
    })
  );

  console.log("Success", info);
};

mintAtom()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
