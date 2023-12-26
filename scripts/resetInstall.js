import '../installSesLockdown.js';
import { Params } from "./constants.js";
import { submitCoreEval, vote } from "./commands.js";

const resetInstall = async () => {
  const resetInstall = {
    title: "Reset manualTimerInstallation",
    description: "Reset manualTimerInstallation",
    coreEvalList: [
      "./core-eval/resetInstall-permit.json",
      "./core-eval/resetInstall.js",
    ],
    ...Params,
  };

  await submitCoreEval(resetInstall);
  console.log("Add Brand Eval Submitted");
  let info = await vote(Params);
  console.log("Success", info);
};

resetInstall().then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

