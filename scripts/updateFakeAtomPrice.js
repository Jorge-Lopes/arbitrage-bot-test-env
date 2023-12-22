import {
  oracleSendOffer,
  oracleAccept,
  oraclePushPrice,
} from "./commands_old.js";

const main = async () => {
  const params = {
    offerId: "1",
    roundId: "1",
    oracleAdminAcceptOfferId: "1",
  };

  const oracleGov1 = {
    oracleIndex: "1",
    address: "agoric1mcm0ffsh0a20hlzgx5wylzw0sm85hxx05azsxx",
    offerPath: `offer-${params.offerId}-oracle1.json`,
    pricePath: `price-offer-${params.offerId}-oracle1.json`,
    ...params,
  };

  const oracleGov2 = {
    oracleIndex: "2",
    address: "agoric1aap7m84dt0rwhhfw49d4kv2gqetzl56vn8aaxj",
    offerPath: `offer-${params.offerId}-oracle2.json`,
    pricePath: `price-offer-${params.offerId}-oracle2.json`,
    ...params,
  };

  const oracleGov3 = {
    oracleIndex: "3",
    address: "agoric1h3jpwr2tawcc4ahlez45qepy5mnwdnlps55xvr",
    offerPath: `offer-${params.offerId}-oracle3`,
    pricePath: `price-offer-${params.offerId}-oracle3`,
    ...params,
  };

  oracleAccept(oracleGov1);
  oracleSendOffer({ address: oracleGov1.address, path: oracleGov1.offerPath });

  oraclePushPrice({ price: 50, ...oracleGov1 });
  oracleSendOffer({ address: oracleGov1.address, path: oracleGov1.pricePath });

  oracleAccept(oracleGov2);
  oracleSendOffer({ address: oracleGov2.address, path: oracleGov2.offerPath });

  oraclePushPrice({ price: 50, ...oracleGov2 });
  oracleSendOffer({ address: oracleGov2.address, path: oracleGov2.pricePath });
};

main();
