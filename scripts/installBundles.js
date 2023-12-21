import { publishContract } from "./commands.js";

const main = () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    key: "gov1",
    gas: "auto",
    adjustment: "1.2",
  };

  const bundleContractAsset =
    "@/workspace/bundles/asset-faucet/b1-bc90824909ce251e1c1647c8348fcac80bc49fc240af2c116ea0a6f4e289090f650812c1fa4c770bc5e10e6ec5926efebed9ec95d302620f51aa5e9443f9c694.json";
  const bundleManifestAsset =
    "@/workspace/bundles/asset-faucet/b1-d945ef0f832f09296f0d3fb8f21c2df0deb1a52178a49fe0aad945384555bc510f7fa747ab9a2e0183d45c9e2088c51050fcfd6cb3c0ef040c90518f9b046ac1.json";
  const bundleContractTimer =
    "@/workspace/bundles/manual-timer/b1-64b95b1a011bcfef38c4ccc0dc50b5c831e272d5244f1257ce9c56537a467a032f3754caebe2272a5999406d333e11ef54eb8189035c78ed6e965a81b56663e6.json";
  const bundleManifestTimer =
    "@/workspace/bundles/manual-timer/b1-dbe02098bd20f6ed2e5160124a888741b36521ab3cc4d32cf7cbe75bb33d9dcf0fb8f2ace2d5e60f34dbf74029b86fd0520fb1b41801e6dc9949ad32c3326d58.json";
  const bundleContractAuctioneer =
    "@/workspace/bundles/auctioneer/b1-a71e2df8c1d9c8eeadcf79bbbd3a25d84e6f10d1db0f5fce2bf705a625f6609f6a33ab8553f01565dd438cbfb4cd52be27b666d91900933908d2974cad32186b.json";
  const bundleManifestAuctioneer =
    "@/workspace/bundles/auctioneer/b1-9d4bdaac3f8b3e2b6ba0a08c9c0f9f6a4017caa525d36876002bcfc23360858b9efb1d5e78d8e3a0bee6b87a5811159462c364a2f406ebab7d9e3317d9ad6a99.json";
  const bundleManifestPrice =
    "@/workspace/bundles/price-feed/b1-80e6fe68b299c82c2d26802c312bc37966a559f7b28f87d058887a79a9db48ad97da2240e71e3f98986071da8fc3c5d02358bec577b17a89cee2b1cb3cd23958.json";

  publishContract(bundleContractAsset, params);
  publishContract(bundleManifestAsset, params);
  publishContract(bundleContractTimer, params);
  publishContract(bundleManifestTimer, params);
  publishContract(bundleContractAuctioneer, params);
  publishContract(bundleManifestAuctioneer, params);
  publishContract(bundleManifestPrice, params);
};

main().then(() => console.log('Success')).catch(err => console.error(err));