import { oracleSendOffer, oracleAccept, oraclePushPrice } from "./commands.js";

const main = async () => {
  const params = {
    offerId: "1",
    roundId: "1",
    oracleAdminAcceptOfferId: "1",
  };

  const offerPath = "/workspace/scripts/";

  const oracleGov1 = {
    oracleIndex: "1",
    address: "agoric1mcm0ffsh0a20hlzgx5wylzw0sm85hxx05azsxx",
    offerPath: `${offerPath}offer-${params.offerId}-oracle${oracleIndex}`,
    pricePath: `${offerPath}price-offer-${params.offerId}-oracle${oracleIndex}`,
    ...params,
  };

  const oracleGov2 = {
    oracleIndex: 2,
    address: "agoric1aap7m84dt0rwhhfw49d4kv2gqetzl56vn8aaxj",
    offerPath: `${offerPath}offer-${params.offerId}-oracle${oracleIndex}`,
    pricePath: `${offerPath}price-offer-${params.offerId}-oracle${oracleIndex}`,
    ...params,
  };

  const oracleGov3 = {
    oracleIndex: 3,
    address: "agoric1h3jpwr2tawcc4ahlez45qepy5mnwdnlps55xvr",
    offerPath: `${offerPath}offer-${params.offerId}-oracle${oracleIndex}`,
    pricePath: `${offerPath}price-offer-${params.offerId}-oracle${oracleIndex}`,
    ...params,
  };

  oracleAccept(oracleGov1);
  oracleSendOffer(oracleGov1.address, oracleGov1.offerPath);

  oraclePushPrice({ price: 5, ...oracleGov1 });
  oracleSendOffer(oracleGov2.address, oracleGov2.offerPath);

  oracleAccept(oracleGov2);
  oracleSendOffer(oracleGov2.address, oracleGov2.pricePath);

  oraclePushPrice({ price: 5, ...oracleGov2 });
  oracleSendOffer(oracleGov2.address, oracleGov2.pricePath);
};

main();
