import "../installSesLockdown.js";
import { publishContract } from "./commands.js";

const installBundles = async () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    key: "liqGov1",
    gas: "auto",
    adjustment: "1.2",
  };

  const bundleContractAsset =
    "@bundles/asset-faucet/b1-bc90824909ce251e1c1647c8348fcac80bc49fc240af2c116ea0a6f4e289090f650812c1fa4c770bc5e10e6ec5926efebed9ec95d302620f51aa5e9443f9c694.json";
  const bundleManifestAsset =
    "@bundles/asset-faucet/b1-d945ef0f832f09296f0d3fb8f21c2df0deb1a52178a49fe0aad945384555bc510f7fa747ab9a2e0183d45c9e2088c51050fcfd6cb3c0ef040c90518f9b046ac1.json";
  const bundleContractTimer =
    "@bundles/manual-timer/b1-e23d92f4d80ba998dbc2b418bc9fd340ee82b3941a3cbe08dcebbcbe6f13c7038005b8a2a258ca9ed6ca7c6e0f0657588fe1875d757a16d2a9e320f21f49fd7f.json";
  const bundleManifestTimer =
    "@bundles/manual-timer/b1-823c9702f233b8f4ca4ebd7892423dfabc577b34b77315868a6323f6684edb65337053eb7da34e13991c8d9857c99e09c89fb09c823d6911283adb65e6093252.json";
  const bundleContractAuctioneer =
    "@bundles/auctioneer/b1-a71e2df8c1d9c8eeadcf79bbbd3a25d84e6f10d1db0f5fce2bf705a625f6609f6a33ab8553f01565dd438cbfb4cd52be27b666d91900933908d2974cad32186b.json";
  const bundleManifestAuctioneer =
    "@bundles/auctioneer/b1-6c696c6288f674a3844b15df0f1a3bbf4d270fdf7b484b0ef142c17040ced3170c46421c97fd7b6608719f7b0a1102b5888acd0b7a5d3c448d20b9291d62afe4.json";
  const bundleManifestPrice =
    "@bundles/price-feed/b1-80e6fe68b299c82c2d26802c312bc37966a559f7b28f87d058887a79a9db48ad97da2240e71e3f98986071da8fc3c5d02358bec577b17a89cee2b1cb3cd23958.json";

  const bundleManifestScaledPA =
    "@bundles/price-feed/b1-de5d5aaef00631dc65afd6237caa59f8ebfd516656a056b500d9c662d662daa661aba3f11d1b40d2f4f2092ce409db43188048a8720da0a6f73ad084994a60fe.json"

  let info;
  info = await publishContract(bundleContractAsset, params);
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

  info = await publishContract(bundleManifestPrice, params);
  console.log("Success", info);

  info = await publishContract(bundleManifestScaledPA, params);
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
