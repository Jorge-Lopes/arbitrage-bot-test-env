// This is generated by writeCoreProposal; please edit!
/* eslint-disable */

const manifestBundleRef = {bundleID:"b1-bc90824909ce251e1c1647c8348fcac80bc49fc240af2c116ea0a6f4e289090f650812c1fa4c770bc5e10e6ec5926efebed9ec95d302620f51aa5e9443f9c694"};
const getManifestCall = harden([
  "getManifestForInitAssetFaucet",
  {
    contractRef: {
      bundleID: "b1-1e841e43415f239d7cbe53850ffc32e8766ed5760657c289f9debc23445e0a32ed82d4e33a9ad53a0fbdf7ae21b4f0c5b06337a50f20422289f8531af186bba7",
    },
  },
]);
const overrideManifest = {
  initAssetFaucet: {
    consume: {
      agoricNamesAdmin: true,
      board: true,
      chainStorage: true,
      zoe: "zoe",
    },
    installation: {
      consume: {
        assetFaucetInstallation: true,
      },
    },
    instance: {
      produce: {
        assetFaucetInstance: true,
      },
    },
    produce: {
      assetFaucetKit: true,
    },
  },
};

// Make the behavior the completion value.
(({
  manifestBundleRef,
  getManifestCall,
  overrideManifest,
  E,
  log = console.info,
  restoreRef: overrideRestoreRef,
}) => {
  const { entries, fromEntries } = Object;

  // deeplyFulfilled is a bit overkill for what we need.
  const shallowlyFulfilled = async obj => {
    if (!obj) {
      return obj;
    }
    const ents = await Promise.all(
      entries(obj).map(async ([key, valueP]) => {
        const value = await valueP;
        return [key, value];
      }),
    );
    return fromEntries(ents);
  };

  /** @param {ChainBootstrapSpace & BootstrapPowers & { evaluateBundleCap: any }} allPowers */
  const behavior = async allPowers => {
    // NOTE: If updating any of these names extracted from `allPowers`, you must
    // change `permits` above to reflect their accessibility.
    const {
      consume: { vatAdminSvc, zoe, agoricNamesAdmin },
      evaluateBundleCap,
      installation: { produce: produceInstallations },
      modules: {
        utils: { runModuleBehaviors },
      },
    } = allPowers;
    const [exportedGetManifest, ...manifestArgs] = getManifestCall;

    const defaultRestoreRef = async ref => {
      // extract-proposal.js creates these records, and bundleName is
      // the name under which the bundle was installed into
      // config.bundles
      const p = ref.bundleName
        ? E(vatAdminSvc).getBundleIDByName(ref.bundleName)
        : ref.bundleID;
      const bundleID = await p;
      const label = bundleID.slice(0, 8);
      return E(zoe).installBundleID(bundleID, label);
    };
    const restoreRef = overrideRestoreRef || defaultRestoreRef;

    // Get the on-chain installation containing the manifest and behaviors.
    console.info('evaluateBundleCap', {
      manifestBundleRef,
      exportedGetManifest,
      vatAdminSvc,
    });
    let bcapP;
    if ('bundleName' in manifestBundleRef) {
      bcapP = E(vatAdminSvc).getNamedBundleCap(manifestBundleRef.bundleName);
    } else {
      bcapP = E(vatAdminSvc).getBundleCap(manifestBundleRef.bundleID);
    }
    const bundleCap = await bcapP;

    const manifestNS = await evaluateBundleCap(bundleCap);

    console.error('execute', {
      exportedGetManifest,
      behaviors: Object.keys(manifestNS),
    });
    const {
      manifest,
      options: rawOptions,
      installations: rawInstallations,
    } = await manifestNS[exportedGetManifest](
      harden({ restoreRef }),
      ...manifestArgs,
    );

    // Await references in the options or installations.
    const [options, installations] = await Promise.all(
      [rawOptions, rawInstallations].map(shallowlyFulfilled),
    );

    // Publish the installations for behavior dependencies.
    const installAdmin = E(agoricNamesAdmin).lookupAdmin('installation');
    await Promise.all(
      entries(installations || {}).map(([key, value]) => {
        produceInstallations[key].resolve(value);
        return E(installAdmin).update(key, value);
      }),
    );

    // Evaluate the manifest for our behaviors.
    return runModuleBehaviors({
      allPowers,
      behaviors: manifestNS,
      manifest: overrideManifest || manifest,
      makeConfig: (name, _permit) => {
        log('coreProposal:', name);
        return { options };
      },
    });
  };

  // Make the behavior the completion value.
  return behavior;
})({ manifestBundleRef, getManifestCall, overrideManifest, E });
