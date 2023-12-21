import { execSync } from "child_process";
import { readFileSync } from "fs";

const agdBin = "agd";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const chainConfig = {
  chainID: "agoriclocal",
  rpc: "http://localhost:26657",
};

const GLOBAL_OPTIONS = ["--output=json"];

const SIGN_BROADCAST_OPTS = (rpc, chainID) => [
  "--keyring-backend=test",
  "--chain-id",
  chainID,
  "--gas=auto",
  "--gas-adjustment=1.2",
  "--yes",
  "--node",
  rpc,
  "--output json",
];

const agd = {
  keys: {
    add: (name) =>
      [agdBin, "keys", "add", name, "--recover", ...GLOBAL_OPTIONS].join(" "),
  },
  query: {
    gov: {
      proposals: (rpc) =>
        [
          agdBin,
          "query",
          "gov",
          "proposals",
          "--node",
          rpc,
          ...GLOBAL_OPTIONS,
        ].join(" "),
    },
  },
  tx: {
    swingset: {
      publish: (bundle, params) =>
        [
          agdBin,
          "tx",
          "swingset",
          "install-bundle",
          bundle,
          "--node",
          params.rpc,
          "--from",
          params.key,
          "--chain-id",
          params.chain_id,
          "--keyring-backend=test",
          "--gas",
          params.gas,
          "-b block",
          "--yes",
        ].join(" "),

      walletAction: (from) =>
        [
          agdBin,
          "tx",
          "swingset",
          "wallet-action",
          `--from=${from}`,
          "--allow-spend",
          ...SIGN_BROADCAST_OPTS("http://0.0.0.0:26657", "agoriclocal"),
          "--offer",
        ].join(" "),
    },
    gov: {
      submit: (coreList, params) =>
        [
          agdBin,
          "tx",
          "gov",
          "submit-proposal",
          "swingset-core-eval",
          ...coreList,
          "--title",
          params.title,
          "--description",
          params.description,
          "--deposit",
          params.deposit,
          "--from",
          params.key,
          "--chain-id",
          params.chain_id,
          "--keyring-backend=test",
          "--gas-adjustment",
          params.adjustment,
          "--gas",
          params.gas,
          "-b block",
          "--yes",
        ].join(" "),

      vote: (proposal_id, params) =>
        [
          agdBin,
          "tx",
          "gov",
          "vote",
          proposal_id,
          "yes",
          "--from",
          params.key,
          "--chain-id",
          params.chain_id,
          "--keyring-backend=test",
          "--gas-adjustment",
          params.adjustment,
          "--gas",
          params.gas,
          "-b block",
          "--yes",
        ].join(" "),
    },
  },
};

const agops = {
  oracle: {
    accept: (params) =>
      [
        "agops",
        "oracle",
        "accept",
        "--offerId",
        `'${params.offerId}'`,
        "fakeATOM.USD",
        ">",
        `'offer-${params.offerId}-w${params.oracleIndex}.json'`,
      ].join(" "),
    pushPriceRound: (params) =>
      [
        "agops",
        "oracle",
        "pushPriceRound",
        "--price",
        `'${params.price}'`,
        "--roundId",
        `'${params.roundId}'`,
        "--oracleAdminAcceptOfferId",
        `'${params.oracleAdminAcceptOfferId}'`,
        ">",
        `'offer-${params.offerId}-w${params.oracleIndex}.json'`,
      ].join(" "),
  },
};

const agoric = {
  wallet: (params) =>
    [
      "agoric",
      "wallet",
      "send",
      `--from`,
      params.from,
      "--keyring-backend=test",
      "--offer",
      params.path,
    ].join(" "),
};

const execute = (cmd, options = {}) => {
  return execSync(cmd, { stdio: "inherit", encoding: "utf-8", ...options });
};

const recoverFromMnemonic = (name) => {
  console.log(`Recovering account ${name}...`);
  const mnemonic = readFileSync(`./mnemonics/${name}-mnemonic`, {
    encoding: "utf-8",
  });
  execute(agd.keys.add(name), { input: mnemonic });
  console.log(`Account recovered: ${name}`);
};

const queryProposals = (rpc) => {
  const proposalsRaw = execute(agd.query.gov.proposals(rpc), { stdio: "pipe" });
  const proposalsParse = JSON.parse(proposalsRaw);
  return proposalsParse.proposals.slice(-1);
};

const spreadList = (list) => {
  let result = [];
  for (let item of list) {
    let [permit, core_eval] = item;
    result.push(permit, core_eval);
  }
  return result;
};

const publishContract = (bundle, params) => {
  console.log("Publish contract");
  execute(agd.tx.swingset.publish(bundle, params), {
    stdio: "pipe",
  });
  console.log("Success");
};

const submitCoreEval = (list, params) => {
  console.log("Submitting core-eval");
  const coreList = spreadList(list);
  execute(agd.tx.gov.submit(coreList, params), {
    stdio: "pipe",
  });
  console.log("Success");
};

const vote = (params) => {
  console.log("Vote on proposal");
  const proposal = queryProposals(params.rpc);
  const proposal_id = proposal[0].proposal_id;
  execute(agd.tx.gov.vote(proposal_id, params), {
    stdio: "pipe",
  });
  console.log("Success");
};

const sendWalletAction = (offer, from) => {
  const tx = execute(agd.tx.swingset.walletAction(offer, from));
  return JSON.parse(tx);
};

const oracleAccept = (params) => {
  console.log("Accept Oracle");
  execute(agops.oracle.accept(params), {
    stdio: "pipe",
  });
  console.log("Success");
};

const oraclePushPrice = (params) => {
  console.log("Oracle Push Price Round");
  execute(agops.oracle.pushPriceRound(params), {
    stdio: "pipe",
  });
  console.log("Success");
};

const oracleSendOffer = (params) => {
  console.log("Oracle send offer");
  execute(agoric.wallet(params.from, params.path));
  console.log("Success");
};

export {
  agd,
  execute,
  recoverFromMnemonic,
  queryProposals,
  publishContract,
  submitCoreEval,
  vote,
  sendWalletAction,
  oracleAccept,
  oracleSendOffer,
  oraclePushPrice,
  sleep,
};
