import { execFileSync } from "child_process";
import { readFileSync } from "fs";
import { pollTx } from "/usr/src/agoric-sdk/packages/agoric-cli/src/lib/chain.js";

const agdBin = "agd";
const agopsBin = "/usr/src/agoric-sdk/node_modules/.bin/agops";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const chainConfig = {
  chainID: "agoriclocal",
  rpc: "http://localhost:26657",
};

const GLOBAL_OPTIONS = ["--keyring-backend=test", "--output=json"];

const agd = {
  keys: {
    add: (name) => ["keys", "add", name, "--recover", ...GLOBAL_OPTIONS],
    show: (name) => ["keys", "show", name, ...GLOBAL_OPTIONS],
  },
  query: {
    gov: {
      proposals: (rpc) => [
        "query",
        "gov",
        "proposals",
        "--node",
        rpc,
        "--output=json",
      ],
    },
  },
  tx: {
    swingset: {
      publish: (bundle, params) => [
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
        "--gas",
        params.gas,
        "--yes",
        ...GLOBAL_OPTIONS,
      ],
      walletAction: (offer, params) => [
        "tx",
        "swingset",
        "wallet-action",
        offer,
        "--from",
        params.key,
        "--allow-spend",
        "--node",
        params.rpc,
        "--chain-id",
        params.chain_id,
        "--gas",
        params.gas,
        "--yes",
        "--fees=10000ubld",
        "--gas-adjustment=1.2",
        ...GLOBAL_OPTIONS,
      ],
      provisionOne: (params, address) => [
        "tx",
        "swingset",
        "provision-one",
        "--from",
        "validator",
        "--node",
        params.rpc,
        "--chain-id",
        params.chain_id,
        "--keyring-backend=test",
        "--output=json",
        "--yes",
        "my-wallet",
        address,
        "SMART_WALLET"
      ],
    },
    gov: {
      submit: (params) => [
        "tx",
        "gov",
        "submit-proposal",
        "swingset-core-eval",
        ...params.coreEvalList,
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
        "--gas-adjustment",
        params.adjustment,
        "--gas",
        params.gas,
        "--yes",
        ...GLOBAL_OPTIONS,
      ],

      vote: (proposal_id, params) => [
        "tx",
        "gov",
        "vote",
        proposal_id,
        "yes",
        "--from",
        params.key,
        "--chain-id",
        params.chain_id,
        "--gas-adjustment",
        params.adjustment,
        "--gas",
        params.gas,
        "--yes",
        ...GLOBAL_OPTIONS,
      ],
    },
  },
};

const execute = (args, options = {}) => {
  return execFileSync(agdBin, args, { encoding: "utf-8", ...options });
};

const sendTx = (args, options = {}) => {
  const tx = execFileSync(agdBin, args, { encoding: "utf-8", ...options });
  console.log({tx})
  const { txhash } = JSON.parse(tx);
  return pollTx(txhash, {
    execFileSync,
    delay: sleep,
    rpcAddrs: [chainConfig.rpc],
  });
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

const publishContract = (bundle, params) => {
  console.log("Publish contract");
  console.log("Success");
  return sendTx(agd.tx.swingset.publish(bundle, params));
};

const submitCoreEval = (params) => {
  console.log("Submitting core-eval");
  return sendTx(agd.tx.gov.submit(params));
};

const vote = (params) => {
  console.log("Vote on proposal");
  const proposal = queryProposals(params.rpc);
  const proposal_id = proposal[0].proposal_id;
  return sendTx(agd.tx.gov.vote(proposal_id, params));
};

const sendWalletAction = (offer, params) => {
  return sendTx(agd.tx.swingset.walletAction(offer, params));
};

const provisionOne = (name, params) => {
  const all = execute(agd.keys.show(name));
  const { address } = JSON.parse(all);
  console.log("Address: ", address);
  return sendTx(agd.tx.swingset.provisionOne(params, address));
};

export {
  agd,
  execute,
  recoverFromMnemonic,
  publishContract,
  submitCoreEval,
  vote,
  sendWalletAction,
  provisionOne,
};
