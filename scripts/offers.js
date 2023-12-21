import { sendWalletAction } from "./commands.js";

const OFFER_ID = {
    Deposit: `auction-deposit-${Date.now()}`,
    Bid: `auction-bid${Date.now()}`,
};

const OfferSpecs = {
    Bid: ({ maxColAmount, minColAmount, bidAmount, price }) => ({
        id: OFFER_ID.Bid,
        invitationSpec: {
            source: 'agoricContract',
            instancePath: ['auctioneer'],
            callPipe: [['makeBidInvitation', [maxColAmount.brand]]],
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
            exitOnBuy: true,
            maxBuy: maxColAmount,
            offerPrice: price,
        },
    }),
};
harden(OfferSpecs);

const sendOffer = (marshaller, params, offerSpec) => {
    const spendAction = {
        method: 'executeOffer',
        offer: offerSpec
    };

    const offer = JSON.stringify(marshaller.toCapData(spendAction));
    return sendWalletAction(offer, params);
};
harden(sendOffer);

export {
    OfferSpecs,
    sendOffer,
};