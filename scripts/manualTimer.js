import { publishContract, submitCoreEval, vote } from "./commands.js";

const main = async () => {
  const params = {
    rpc: "http://0.0.0.0:26657",
    chain_id: "agoriclocal",
    key: "validator",
    deposit: "10000000ubld",
    gas: "auto",
    adjustment: "1.2",
    title: "manualTimer",
    description: "manualTimer_core_eval",
  };

  const bundleContract =
    "@/workspace/bundles/manual-timer/b1-64b95b1a011bcfef38c4ccc0dc50b5c831e272d5244f1257ce9c56537a467a032f3754caebe2272a5999406d333e11ef54eb8189035c78ed6e965a81b56663e6.json";
  const bundleManifest =
    "@/workspace/bundles/manual-timer/b1-dbe02098bd20f6ed2e5160124a888741b36521ab3cc4d32cf7cbe75bb33d9dcf0fb8f2ace2d5e60f34dbf74029b86fd0520fb1b41801e6dc9949ad32c3326d58.json";

  const coreEvalList = [
    [
      "/workspace/core-eval/startManualTimerFaucet-permit.json",
      "/workspace/core-eval/startManualTimerFaucet.js",
    ],
  ];

  await publishContract(bundleContract, params);
  await publishContract(bundleManifest, params);
  await submitCoreEval(coreEvalList, params);
  await vote(params);
};

main().then(() => console.log('Success')).catch(err => console.error(err));
