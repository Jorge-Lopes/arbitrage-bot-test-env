import { execSync } from "child_process";
import { readFileSync } from "fs";

const agdBin = "agd";

const GLOBAL_OPTIONS = [ "--output=json"];

const SIGN_BROADCAST_OPTS = [
  "--keyring-backend=test",
  "--gas=auto",
  "--fees=80000ubld",
  "--gas-adjustment=1.2",
  "--yes",
  "--output",
  "json",
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

export {
  agd,
  execute,
  recoverFromMnemonic,
  queryProposals,
  publishContract,
  submitCoreEval,
  vote,
};
