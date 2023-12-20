import { publishContract, submitCoreEval, vote } from "./commands.js";

const main = () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    key: "validator",
    deposit: "10000000ubld",
    gas: "auto",
    adjustment: "1.2",
    title: "auctioneer",
    description: "auctioneer_core_eval",
  };

  const bundleContract =
    "@/workspace/bundles/auctioneer/b1-a71e2df8c1d9c8eeadcf79bbbd3a25d84e6f10d1db0f5fce2bf705a625f6609f6a33ab8553f01565dd438cbfb4cd52be27b666d91900933908d2974cad32186b.json";
  const bundleManifest =
    "@/workspace/bundles/auctioneer/b1-5ea4e1abb079f04590abc84b09eadd0cb2fa9d4ae7997bbdae9b1e23860233ef0cf1d625453e4e7862c26fc54798a8e89582c37dac30feddd348c4468338bf19.json";

  const coreEvalList = [
    [
      "/workspace/core-eval/startAuctioneer-permit.json",
      "/workspace/core-eval/startAuctioneer.js",
    ],
  ];

  publishContract(bundleContract, params);
  publishContract(bundleManifest, params);
  submitCoreEval(coreEvalList, params);
  vote(params);
};

main();
