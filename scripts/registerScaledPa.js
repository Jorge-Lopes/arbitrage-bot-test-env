import "../installSesLockdown.js";
import { submitCoreEval, vote } from "./commands.js";
import { Params } from "./constants.js";

const registerScaledPA = async () => {
  const registerScaledPA = {
    title: "registerScaledPA",
    description: "registerScaledPA",
    coreEvalList: [
      "/workspace/core-eval/register-scaled-pa-fake-atom-permit.json",
      "/workspace/core-eval/register-scaled-pa-fake-atom.js",
    ],
    ...Params,
  };

  await submitCoreEval(registerScaledPA);
  console.log("Register Scaled PA Submitted");
  let info = await vote(Params);
  console.log("Success", info);
};

registerScaledPA()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
