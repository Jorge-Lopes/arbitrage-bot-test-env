# arbitrage-bot-test-env

## Provision account

make TO=agoric1mcm0ffsh0a20hlzgx5wylzw0sm85hxx05azsxx mint-ist

## full cycle for asset faucet

agd tx swingset install-bundle @/workspace/bundles/auctioneer/b1-9d4bdaac3f8b3e2b6ba0a08c9c0f9f6a4017caa525d36876002bcfc23360858b9efb1d5e78d8e3a0bee6b87a5811159462c364a2f406ebab7d9e3317d9ad6a99.json --from=gov1 --chain-id=agoriclocal --node=http://0.0.0.0:26657 --keyring-backend=test --gas=auto --yes -b block

agd tx swingset install-bundle @/workspace/bundles/asset-faucet/b1-d945ef0f832f09296f0d3fb8f21c2df0deb1a52178a49fe0aad945384555bc510f7fa747ab9a2e0183d45c9e2088c51050fcfd6cb3c0ef040c90518f9b046ac1.json --from=gov1 --chain-id=agoriclocal --node=http://0.0.0.0:26657 --keyring-backend=test --gas=auto --yes -b block

agd tx gov submit-proposal swingset-core-eval \
 /workspace/core-eval/startAssetFaucet-permit.json \
 /workspace/core-eval/startAssetFaucet.js \
--title="fakeAtomFaucet" --description="fakeAtomFaucet_core_eval" --deposit=10000000ubld \
 --from validator --chain-id=agoriclocal --keyring-backend=test --gas=auto --yes -b block

agd tx gov vote 9 yes --from=agoric1499h5lwqgqj0mrwkpkjttppvtrzs5raxayf55n --keyring-backend=test --chain-id=agoriclocal --gas=auto --gas-adjustment=1.2 --yes -b block

## full cycle for timer

agd tx swingset install-bundle @/workspace/bundles/auctioneer/b1-a71e2df8c1d9c8eeadcf79bbbd3a25d84e6f10d1db0f5fce2bf705a625f6609f6a33ab8553f01565dd438cbfb4cd52be27b666d91900933908d2974cad32186b.json --from=gov1 --chain-id=agoriclocal --node=http://0.0.0.0:26657 --keyring-backend=test --gas=auto --yes -b block

agd tx swingset install-bundle @/workspace/bundles/manual-timer/b1-dbe02098bd20f6ed2e5160124a888741b36521ab3cc4d32cf7cbe75bb33d9dcf0fb8f2ace2d5e60f34dbf74029b86fd0520fb1b41801e6dc9949ad32c3326d58.json --from=gov1 --chain-id=agoriclocal --node=http://0.0.0.0:26657 --keyring-backend=test --gas=auto --yes -b block

agd tx gov submit-proposal swingset-core-eval \
 /workspace/core-eval/startManualTimerFaucet-permit.json \
 /workspace/core-eval/startManualTimerFaucet.js \
--title="startManualTimerFaucet" --description="startManualTimerFaucet_core_eval" --deposit=10000000ubld \
 --from validator --chain-id=agoriclocal --keyring-backend=test --gas=auto --yes -b block

agd tx gov vote 10 yes --from=validator --keyring-backend=test --chain-id=agoriclocal --gas=auto --gas-adjustment=1.2 --yes -b block

## oracle gov1

agops oracle accept --offerId 1 --pair fakeATOM.USD > offer-1-w1.json

agoric wallet send --from agoric1mcm0ffsh0a20hlzgx5wylzw0sm85hxx05azsxx --offer offer-1-w1.json --keyring-backend=test

agops oracle pushPriceRound --price 10 --roundId 1 --oracleAdminAcceptOfferId 1 > price-offer-1-w1.json

agoric wallet send --from agoric1mcm0ffsh0a20hlzgx5wylzw0sm85hxx05azsxx --offer price-offer-1-w1.json --keyring-backend=test

## oracle gov2

# submit a price from wallet 2

agops oracle accept --offerId 1 --pair fakeATOM.USD > offer-1-w2.json

agoric wallet send --from agoric1aap7m84dt0rwhhfw49d4kv2gqetzl56vn8aaxj --offer offer-1-w2.json --keyring-backend=test

agops oracle pushPriceRound --price 10 --roundId 1 --oracleAdminAcceptOfferId 1 > price-offer-1-w2.json

agoric wallet send --from agoric1aap7m84dt0rwhhfw49d4kv2gqetzl56vn8aaxj --offer price-offer-1-w2.json --keyring-backend=test

# verify price feed

agoric follow :published.priceFeed.stATOM-USD_price_feed
