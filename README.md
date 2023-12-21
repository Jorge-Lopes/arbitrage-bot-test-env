# arbitrage-bot-test-env

## Guide for set test environment:

### Provision accounts

```shell
cd /workspace
make sendAsset
make mint-ist

```

### Deploy contracts

```shell
cd /workspace/scripts
node installBundles.js
node deployContracts.js
```

### Work in progress

#### Commands.js

- Replace commands_old.js with commands.js

#### updateFakeAtomPrice,js

- The `oracleAccept` and `oraclePushPrice` methods are currently not working because I couldn't find out how to execute the `agops` command
- Bellow there are the instructions to execute it on the docker terminal

oracle gov1:

```shell
agops oracle accept --offerId 1 --pair fakeATOM.USD > offer-1-w1.json

agoric wallet send --from agoric1mcm0ffsh0a20hlzgx5wylzw0sm85hxx05azsxx --offer offer-1-w1.json --keyring-backend=test

agops oracle pushPriceRound --price 10 --roundId 1 --oracleAdminAcceptOfferId 1 > price-offer-1-w1.json

agoric wallet send --from agoric1mcm0ffsh0a20hlzgx5wylzw0sm85hxx05azsxx --offer price-offer-1-w1.json --keyring-backend=test
```

oracle gov2:

```shell
agops oracle accept --offerId 1 --pair fakeATOM.USD > /price-feed-offers/offer-1-w2.json

agoric wallet send --from agoric1aap7m84dt0rwhhfw49d4kv2gqetzl56vn8aaxj --offer offer-1-w2.json --keyring-backend=test

agops oracle pushPriceRound --price 10 --roundId 1 --oracleAdminAcceptOfferId 1 > price-offer-1-w2.json

agoric wallet send --from agoric1aap7m84dt0rwhhfw49d4kv2gqetzl56vn8aaxj --offer price-offer-1-w2.json --keyring-backend=test
```
