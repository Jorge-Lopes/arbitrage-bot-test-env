import { registerScaledPriceAuthority } from "@agoric/inter-protocol/src/proposals/addAssetToVault.js";

export const registerFakeATOMScaledPA = (powers, options) => registerScaledPriceAuthority(powers, options);

export const getManifestForFakeATOMScaledPA = (
  {},
  { interchainAssetOptions }
) => {
  return {
    manifest: {
      [registerFakeATOMScaledPA.name]: {
        consume: {
          agoricNamesAdmin: true,
          startUpgradable: true,
          priceAuthorityAdmin: true,
          priceAuthority: true,
          scaledPriceAuthorityKits: true,
        },
        produce: {
          scaledPriceAuthorityKits: true,
        },
        installation: {
          consume: { scaledPriceAuthority: true },
        },
      },
    },
    options: {
      interchainAssetOptions,
    },
  }
};