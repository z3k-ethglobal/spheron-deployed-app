# Filecoin Metadata Store

1. Install all dependencies:

```bash
yarn install
```

2. Run a local network in the first terminal: (if you want to deploy on localhost)

```bash
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```bash
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```bash
yarn start
```

Visit your app on: `http://localhost:3000`.


- Edit your smart contract `FilecoinMetadataStore.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## 📝 Notes
### Deploying App on Scroll + Spheron

- Deployed on Scroll: https://scroll.network/
- Deployed on Spheron: https://spheron.finance/

To Deploy on scroll sepolia testnet:
```bash
yarn deploy --network scrollSepolia
```

To verfiy the contract on scroll sepolia testnet:
```bash
yarn harhat verify --network scrollSepolia <contract address> "Constructor argument 1" "Constructor argument 2"
```

This Project was built on top of the `Scaffold-eth-2` Template