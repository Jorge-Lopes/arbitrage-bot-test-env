import "../installSesLockdown.js";
import { submitCoreEval, vote } from "./commands.js";

const deployContracts = async () => {
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

  await submitCoreEval(assetFaucet);
  let info = await vote(params);
  console.log("Success", info);

  await submitCoreEval(manualTimer);
  info = await vote(params);
  console.log("Success", info);

  await submitCoreEval(atomOracle);
  info = await vote(params);
  console.log("Success", info);

  await submitCoreEval(auctioneer);
  info = await vote(params);
  console.log("Success", info);
};

deployContracts()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
