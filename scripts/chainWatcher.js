import { makeLeader, makeCastingSpec, makeFollower, iterateLatest } from '@agoric/casting';
import { makeImportContext } from '@agoric/smart-wallet/src/marshal-contexts.js';
import { makePromiseKit } from '@endo/promise-kit';
import { toObjectRecord } from "./helpers.js";

const makeChainWatcher = networkConfigAddr => {
    const leader = makeLeader(networkConfigAddr);
    const { fromBoard: marshaller } = makeImportContext();
    const options = harden({
        unserializer: marshaller,
    });

    const state = {};
    const promiseKits = harden({
        brands: makePromiseKit(),
        issuers: makePromiseKit(),
        instances: makePromiseKit(),
    });

    const brandCastingSpec = makeCastingSpec(':published.agoricNames.brand');
    const brandFollower = makeFollower(brandCastingSpec, leader, options);

    const issuerCastingSpec = makeCastingSpec(':published.agoricNames.issuer');
    const issuerFollower = makeFollower(issuerCastingSpec, leader, options);

    const instanceCastingSpec = makeCastingSpec(':published.agoricNames.instance');
    const instanceFollower = makeFollower(instanceCastingSpec, leader, options);

    const watchBrand = async () => {
        for await (const { value: brands } of iterateLatest(brandFollower)) {
            state.brands = brands;
            promiseKits.brands.resolve(true);
        }
    };

    const watchIssuer = async () => {
        for await (const { value: issuers } of iterateLatest(issuerFollower)) {
            state.issuers = issuers;
            promiseKits.issuers.resolve(true);
        }
    };

    const watchInstance = async () => {
        for await (const { value: instances } of iterateLatest(instanceFollower)) {
            state.instances = instances;
            promiseKits.instances.resolve(true);
        }
    };

    const getState = async (keywords) => {
        const requestedState = [...keywords]
            .filter(keyword => promiseKits[keyword] !== undefined)
            .map(filteredKey => promiseKits[filteredKey].promise);
        await Promise.all(requestedState);

        return harden(toObjectRecord({ ...state }, keywords));
    };

    const watch = () => {
        watchBrand();
        watchIssuer();
        watchInstance();
    };

    return harden({
        watch,
        getState,
        marshaller,
    });
};
harden(makeChainWatcher);

export { makeChainWatcher };
