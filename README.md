# arbitrage-bot-test-env

## Install bundle

agd tx swingset install-bundle @/workspace/bundles/asset-faucet/b1-bc90824909ce251e1c1647c8348fcac80bc49fc240af2c116ea0a6f4e289090f650812c1fa4c770bc5e10e6ec5926efebed9ec95d302620f51aa5e9443f9c694.json --from=gov1  --chain-id=agoriclocal --node=http://0.0.0.0:26657 --keyring-backend=test --gas=auto --yes -b block

### Error message

raw_log: 'controller refused message admission: 0uist is smaller than 1289800000uist:
  insufficient funds: mempool is full'


## Provision account

ACCT_ADDR=agoric1mcm0ffsh0a20hlzgx5wylzw0sm85hxx05azsxx FUNDS=9999000000ubld,9999000000uist make fund-acct