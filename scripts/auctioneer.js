import { publishContract, submitCoreEval, vote } from "./commands.js";

const main = async () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    key: "validator",
    deposit: "10000000ubld",
    gas: "auto",
    adjustment: "1.2",
    title: "startAuctioneer",
    description: "startAuctioneer_core_eval",
  };

  const coreEvalList = [
    [
      "/workspace/core-eval/startAuctioneer-permit.json",
      "/workspace/core-eval/startAuctioneer.js",
    ],
  ];

  submitCoreEval(coreEvalList, params);
  vote(params);
};

main().then(() => console.log('Success')).catch(err => console.error(err));
