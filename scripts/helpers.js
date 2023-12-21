import { makeChainWatcher } from "./chainWatcher.js";

const toObjectRecord = (rawObject, keywords) => {
    const records = {};
    [...keywords].forEach(keyword => {
        records[keyword] = Object.fromEntries(rawObject[keyword]);
    });

    return harden({
        ...rawObject,
        ...records,
    });
};
harden(toObjectRecord);

const initWatcher = async networkConfig => {
    const result = await fetch(networkConfig);
    const {
        chainName,
        rpcAddrs: [rpc],
    } = await result.json();
    console.log('result', { chainName, rpc });

    const chainWatcher = makeChainWatcher(networkConfig);

    return harden({
        chainWatcher,
    });
};
harden(initWatcher);

export {
  initWatcher,
  toObjectRecord,
};