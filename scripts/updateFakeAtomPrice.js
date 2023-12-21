import { sendWalletAction, oracleAccept, oraclePushPrice } from "./commands.js";

const main = async () => {
  const params = {
    offerId: "1",
    oracleIndex: "1",
    price: "2",
    roundId: 1,
    oracleAdminAcceptOfferId: 1,
  };

  const oracle1 = {
    oracleIndex: 1,
    ...params,
  };

  const oracle2 = {
    oracleIndex: 2,
    ...params,
  };

  oracleSendOffer({
    from: "agoric1mcm0ffsh0a20hlzgx5wylzw0sm85hxx05azsxx",
    path: "/workspace/scripts/offer-1-w1.json",
  });
};

main()
  .then(() => console.log("Success"))
  .catch((err) => console.error(err));
