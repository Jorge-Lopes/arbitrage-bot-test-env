import { publishContract, submitCoreEval, vote } from "./commands.js";

const main = () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    key: "validator",
    deposit: "10000000ubld",
    gas: "auto",
    adjustment: "1.2",
    title: "startFakeAtomOracle",
    description: "startFakeAtomOracle_core_eval",
  };

  const coreEvalList = [
    [
      "/workspace/core-eval/startFakeAtomOracle-permit.json",
      "/workspace/core-eval/startFakeAtomOracle.js",
    ],
  ];

  submitCoreEval(coreEvalList, params);
  vote(params);
};

main();
