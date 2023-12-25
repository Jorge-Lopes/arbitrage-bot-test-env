const addBrand = async ({
                    consume: {
                      fakeAuctioneerKit: fakeAuctioneerKitP,
                      agoricNames
                    },
                  }) => {
  const [fakeAuctioneerKit, FakeATOM] = await Promise.all([
    fakeAuctioneerKitP,
    E(agoricNames).lookup('issuer', 'FakeATOM')
  ]);

  console.log({
    fakeAuctioneerKit,
    FakeATOM
  });
  await E(fakeAuctioneerKit.creatorFacet).addBrand(FakeATOM, 'FakeATOM');
}

addBrand;