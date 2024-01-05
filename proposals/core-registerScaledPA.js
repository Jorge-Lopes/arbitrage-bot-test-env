import { getManifestForFakeATOMScaledPA } from "./registerScaledPA.js";
import { makeHelpers } from '@agoric/deploy-script-support';

export const defaultProposalBuilder = async () => {
  return harden({
    sourceSpec: './registerScaledPA.js',
    getManifestCall: [
      getManifestForFakeATOMScaledPA.name,
      {
        interchainAssetOptions: {
          keyword: 'FakeATOM',
          oracleBrand: 'FakeATOM',
        },
      },
    ],
  });
};

export default async (homeP, endowments) => {
  const { writeCoreProposal } = await makeHelpers(homeP, endowments);

  await writeCoreProposal('register-scaled-pa-fake-atom', defaultProposalBuilder);
};