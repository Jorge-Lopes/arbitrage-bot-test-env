CHAINID=agoriclocal
USER1ADDR=$(shell agd keys show gov1 -a --keyring-backend="test")
VALIDATOR = $(shell agd keys show -a validator --keyring-backend=test)
ACCT_ADDR=$(USER1ADDR)
BLD=000000ubld

CRABBLE_ROOT=/workspace

ATOM_DENOM=ibc/BA313C4A19DFBF943586C0387E6B11286F9E416B4DD27574E6909CABE0E342FA
ATOM=000000$(ATOM_DENOM)

AGORIC_BIN_PATH=/usr/src/agoric-sdk

CONTRACT_NAME="contract"
GOVERNOR_NAME="governor"

balance-q: target = $(shell agd keys show $(TARGET) -a --keyring-backend="test")
balance-q:
	agd keys show $(target) -a --keyring-backend="test"
	agd query bank balances $(target)

GAS_ADJUSTMENT=1.2
SIGN_BROADCAST_OPTS=--keyring-backend=test --chain-id=$(CHAINID) \
		--gas=auto --gas-adjustment=$(GAS_ADJUSTMENT) \
		--yes -b block

WANT_VALUE=20000
GIVE_VALUE=10000
TO=$(USER1ADDR)
mint-ist:
	make FUNDS=$(GIVE_VALUE)$(ATOM) ACCT_ADDR=$(TO) fund-acct -f Makefile
	cd $(AGORIC_BIN_PATH) && \
		yarn --silent agops vaults open --wantMinted $(WANT_VALUE) --giveCollateral $(GIVE_VALUE) >/tmp/want4k.json && \
		yarn --silent agops perf satisfaction --executeOffer /tmp/want4k.json --from gov1 --keyring-backend=test
	sleep 3

FUNDS=321$(BLD)
fund-acct:
	agd tx bank send validator $(ACCT_ADDR) $(FUNDS) \
	  $(SIGN_BROADCAST_OPTS) \
	  -o json >,tx.json
	jq '{code: .code, height: .height}' ,tx.json

gov-q:
	agd query gov proposals --output json | \
		jq -c '.proposals[] | [.proposal_id,.voting_end_time,.status, .total_deposit]'

ATOM_AMOUNT=9000000000000000
sendAsset:
	agd tx bank send ${VALIDATOR} $(ACCT_ADDR) ${ATOM_AMOUNT}ibc/BA313C4A19DFBF943586C0387E6B11286F9E416B4DD27574E6909CABE0E342FA --chain-id agoriclocal --keyring-backend=test -b block -y