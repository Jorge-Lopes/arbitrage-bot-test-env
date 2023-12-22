import "../installSesLockdown.js";
import { publishContract, submitCoreEval, vote } from "./commands.js";

const getPriceFeedKit = async () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    deposit: "10000000ubld",
    gas: "auto",
    adjustment: "1.2",
  };

  const bundleManifest =
    "@/workspace/bundles/get-price-feed-kit/b1-e72ca0d5e111b4ab278cf05e81ab9be5c2bfd864a0b6a3116798fc4f674b34ba052ae10fbd6e38d6f43b293fa0c157f5c62d7d99e5bdff11e5e541c36277ed76.json";

  const priceFeedKit = {
    title: "getPriceFeedKit",
    description: "getPriceFeedKit",
    coreEvalList: [
      "/workspace/core-eval/getPriceFeedKit-permit.json",
      "/workspace/core-eval/getPriceFeedKit.js",
    ],
    key: "validator",
    ...params,
  };

  let info = await publishContract(bundleManifest, { key: "gov1", ...params });
  console.log("Success", info);

  await submitCoreEval(priceFeedKit);
  info = await vote({ key: "validator", ...params });
  console.log("Success", info);
};

getPriceFeedKit()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
