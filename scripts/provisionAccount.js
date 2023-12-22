import "../installSesLockdown.js";
import { provisionOne } from "./commands.js";
import { Params } from "./constants.js";

const provisionAccount = async () => {
  const name = process.env.ACCT;

  await provisionOne(name, Params);
};

provisionAccount().then(() => {
  console.log('Done');
}).catch(err => console.error(err));