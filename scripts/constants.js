const Params = harden({
  rpc: "http://0.0.0.0:26657",
  chain_id: "agoriclocal",
  key: "validator",
  deposit: "10000000ubld",
  gas: "auto",
  adjustment: "1.2",
  title: "fakeAtomFaucet",
  description: "fakeAtomFaucet_core_eval",
});

const CollateralKeyword = 'ATOM';
const BidKeyword = 'IST';
const AuctionerrKeyword = 'fakeAuctioneer';
const TimerKeyword = 'manualTimer';

export {
  Params,
  CollateralKeyword,
  BidKeyword,
  AuctionerrKeyword,
  TimerKeyword,
};