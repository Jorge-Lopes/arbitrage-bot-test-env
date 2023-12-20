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

  const bundleManifest =
    "@/workspace/bundles/price-feed/b1-80e6fe68b299c82c2d26802c312bc37966a559f7b28f87d058887a79a9db48ad97da2240e71e3f98986071da8fc3c5d02358bec577b17a89cee2b1cb3cd23958.json";

  const coreEvalList = [
    [
      "/workspace/core-eval/startFakeAtomOracle-permit.json",
      "/workspace/core-eval/startFakeAtomOracle.js",
    ],
  ];

  publishContract(bundleManifest, params);
  submitCoreEval(coreEvalList, params);
  vote(params);
};

main();
