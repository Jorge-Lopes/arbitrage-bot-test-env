import { submitCoreEval, vote } from "./commands_old.js";

const main = async () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    key: "validator",
    deposit: "10000000ubld",
    gas: "auto",
    adjustment: "1.2",
  };

  const assetFaucet = {
    title: "startAssetFaucet",
    description: "startAssetFaucet_core_eval",
    coreEvalList: [
      "/workspace/core-eval/startAssetFaucet-permit.json",
      "/workspace/core-eval/startAssetFaucet.js",
    ],
    ...params,
  };

  const manualTimer = {
    title: "startManualTimerFaucet",
    description: "startManualTimerFaucet_core_eval",
    coreEvalList: [
      "/workspace/core-eval/startManualTimerFaucet-permit.json",
      "/workspace/core-eval/startManualTimerFaucet.js",
    ],
    ...params,
  };

  const atomOracle = {
    title: "startFakeAtomOracle",
    description: "startFakeAtomOracle_core_eval",
    coreEvalList: [
      "/workspace/core-eval/startFakeAtomOracle-permit.json",
      "/workspace/core-eval/startFakeAtomOracle.js",
    ],
    ...params,
  };

  const auctioneer = {
    title: "startAuctioneer",
    description: "startAuctioneer_core_eval",
    coreEvalList: [
      "/workspace/core-eval/startAuctioneer-permit.json",
      "/workspace/core-eval/startAuctioneer.js",
    ],
    ...params,
  };

  submitCoreEval(assetFaucet);
  vote(params);

  submitCoreEval(manualTimer);
  vote(params);

  submitCoreEval(atomOracle);
  vote(params);

  submitCoreEval(auctioneer);
  vote(params);
};

main();
