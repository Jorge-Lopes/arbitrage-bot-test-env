import { publishContract, submitCoreEval, vote } from "./commands.js";

const main = () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    key: "validator",
    deposit: "10000000ubld",
    gas: "auto",
    adjustment: "1.2",
    title: "startAssetFaucet",
    description: "startAssetFaucet_core_eval",
  };

  const coreEvalList = [
    [
      "/workspace/core-eval/startAssetFaucet-permit.json",
      "/workspace/core-eval/startAssetFaucet.js",
    ],
  ];

  submitCoreEval(coreEvalList, params);
  vote(params);
};

main();
