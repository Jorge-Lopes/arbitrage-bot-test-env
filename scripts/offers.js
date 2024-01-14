import { sendWalletAction } from "./commands.js";
import {
  AuctioneerKeyword,
  TimerKeyword,
  AtomFaucetKeyword,
} from "./constants.js";

const OFFER_ID = {
  Deposit: `auction-deposit-${Date.now()}`,
  Bid: `auction-bid-${Date.now()}`,
  Timer: `timer-${Date.now()}`,
  Mint: `mint--${Date.now()}`,
};

const OfferSpecs = {
  Bid: ({ maxColAmount, minColAmount, bidAmount, price }) => ({
    id: OFFER_ID.Bid,
    invitationSpec: {
      source: "agoricContract",
      instancePath: [AuctioneerKeyword],
      callPipe: [["makeBidInvitation", [maxColAmount.brand]]],
    },
    proposal: {
      give: {
        Bid: bidAmount,
      },
      ...(minColAmount
        ? {
            want: {
              Collateral: minColAmount,
            },
          }
        : {}),
    },
    offerArgs: {
      exitAfterBuy: true,
      maxBuy: maxColAmount,
      offerPrice: price,
    },
  }),
  Deposit: ({ collateralAmount, goal = null }) => ({
    id: OFFER_ID.Deposit,
    invitationSpec: {
      source: "agoricContract",
      instancePath: [AuctioneerKeyword],
      callPipe: [["makeDepositInvitation"]],
    },
    proposal: {
      give: {
        Collateral: collateralAmount,
      },
    },
    offerArgs: { ...(goal ? { goal } : {}) }
  }),
  Timer: ({ timestamp }) => ({
    id: OFFER_ID.Timer,
    invitationSpec: {
      source: "agoricContract",
      instancePath: [TimerKeyword],
      callPipe: [["makeAdvanceTimeInvitation"]],
    },
    proposal: {},
    offerArgs: { timestamp },
  }),
  MintAtom: ({ amount }) => ({
    id: OFFER_ID.Mint,
    invitationSpec: {
      source: "agoricContract",
      instancePath: [AtomFaucetKeyword],
      callPipe: [["makeMintInvitation"]],
    },
    proposal: {
      want: {
        FakeATOM: amount,
      },
    },
  }),
};
harden(OfferSpecs);

const sendOffer = (marshaller, params, offerSpec) => {
  const spendAction = {
    method: "executeOffer",
    offer: offerSpec,
  };

  const offer = JSON.stringify(marshaller.toCapData(harden(spendAction)));
  return sendWalletAction(offer, params);
};
harden(sendOffer);

export { OfferSpecs, sendOffer };
