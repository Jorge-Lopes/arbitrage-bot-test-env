import { publishContract, submitCoreEval, vote } from "./commands.js";

const main = async () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    key: "validator",
    deposit: "10000000ubld",
    gas: "auto",
    adjustment: "1.2",
    title: "fakeAtomFaucet",
    description: "fakeAtomFaucet_core_eval",
  };

  const bundleContract =
    "@/workspace/bundles/asset-faucet/b1-bc90824909ce251e1c1647c8348fcac80bc49fc240af2c116ea0a6f4e289090f650812c1fa4c770bc5e10e6ec5926efebed9ec95d302620f51aa5e9443f9c694.json";
  const bundleManifest =
    "@/workspace/bundles/asset-faucet/b1-d945ef0f832f09296f0d3fb8f21c2df0deb1a52178a49fe0aad945384555bc510f7fa747ab9a2e0183d45c9e2088c51050fcfd6cb3c0ef040c90518f9b046ac1.json";

  const coreEvalList = [
    [
      "/workspace/core-eval/startAssetFaucet-permit.json",
      "/workspace/core-eval/startAssetFaucet.js",
    ],
  ];

  await publishContract(bundleContract, params);
  await publishContract(bundleManifest, params);
  await submitCoreEval(coreEvalList, params);
  await vote(params);
};

main().then(() => console.log('Success')).catch(err => console.error(err));
