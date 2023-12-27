import "../installSesLockdown.js";
import { submitCoreEval, vote } from "./commands.js";
import { Params } from "./constants.js";

const addBrand = async () => {
  const addBrand = {
    title: "Add FakeATOM to auctioneer",
    description: "Add FakeATOM to auctioneer",
    coreEvalList: [
      "./core-eval/addBrand-permit.json",
      "./core-eval/addBrand.js",
    ],
    ...Params,
  };

  await submitCoreEval(addBrand);
  console.log("Add Brand Eval Submitted");
  let info = await vote(Params);
  console.log("Success", info);
};

addBrand()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
