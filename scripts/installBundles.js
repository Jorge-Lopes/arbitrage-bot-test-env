import "../installSesLockdown.js";
import { publishContract } from "./commands.js";

const installBundles = async () => {
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
    "@/workspace/bundles/auctioneer/b1-6c696c6288f674a3844b15df0f1a3bbf4d270fdf7b484b0ef142c17040ced3170c46421c97fd7b6608719f7b0a1102b5888acd0b7a5d3c448d20b9291d62afe4.json";
  const bundlePriceAggregator =
    "@/workspace/bundles/price-feed/b1-18d599100b4a9f65827bc1a0bddbe3532e8061220074961587677d04a6f52abacb7c87a6b552102539b630af4184705cfb34b56e23de718e99d17591aeb87e40.json";
  const bundleManifestPriceFeed =
    "@/workspace/bundles/price-feed/b1-1f7685f4343148b6cde93f7e18f7fe0b92a6a8d380342151c43ece34c0f7696f273ed7aef750eebf187501e7300dabf9a0d7d809b950e5ca8085f34f041be7f0.json";

  let info = await publishContract(bundleContractAsset, params);
  console.log("Success", info);

  info = await publishContract(bundleManifestAsset, params);
  console.log("Success", info);

  info = await publishContract(bundleContractTimer, params);
  console.log("Success", info);

  info = await publishContract(bundleManifestTimer, params);
  console.log("Success", info);

  info = await publishContract(bundleContractAuctioneer, params);
  console.log("Success", info);

  info = await publishContract(bundleManifestAuctioneer, params);
  console.log("Success", info);

  info = await publishContract(bundlePriceAggregator, params);
  console.log("Success", info);

  info = await publishContract(bundleManifestPriceFeed, params);
  console.log("Success", info);
};

installBundles()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
