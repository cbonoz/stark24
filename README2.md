<p align='center'>
  <img src="./public/logo.png" width=600 />
</p>

zkPages
---

Zero knowledge digital content single page store fronts.

Enable anyone to create a secure digital content store front page on Stark. Privacy-focused checkouts.

Going after the Consumer and Privacy categories of Starknet.

Live Demo url: https://zkpages.vercel.app (Starknet Sepolia testnet)

Demo video (youtube ~3 minutes):

### Features

- [x] Single page store front managed by Starknet smart contracts
- [x] Every store has it's own audit history
- [x] Zero knowledge checkout
- [x] Trace-free payments
- [x] IPFS content delivery

#### How it works

zkPages allows users to create single-page digital content storefronts powered by Starknet smart contracts. The platform emphasizes privacy and security through zero-knowledge checkouts and trace-free payments. Users can easily manage their store, upload content, and track their audit history, ensuring transparency and accountability. The integration with IPFS ensures that the digital content is delivered efficiently and securely.

1. Create a Stark account: Start by creating an account on the Starknet network to get access to the zkPages platform.
2. Create a zkPages store: Use the zkPages interface to set up your digital content store. Each store is represented as a single-page storefront.
3. Add digital content: Upload your digital content to the store. The content is delivered securely via IPFS.
4. Share your store front URL online: Promote your store by sharing the unique URL with your audience.
Description

### How it's made

zkPages is built on top of the Starknet blockchain, utilizing its scalability and security features. The platform employs zero-knowledge proofs to ensure that checkouts are private and secure, without exposing unnecessary information. Content is stored and delivered via IPFS, a decentralized storage network, which ensures that digital assets are distributed efficiently and reliably. The frontend is designed to be user-friendly, allowing anyone to set up a store with minimal technical knowledge.

When a user accesses a deployed zkPage, he/she has the ability to initiate a private checkout. Upon completion, a contract event gets saved to the zkPage smart contract and the user is redirected to the purchase success url where he/she can access the content. Any guards or security around access (ex: sharing the link with others) should be baked into the url itself, ZkPages does not control or apply any access guards to the url currently otherwise.

<b>Note this app is currently a prototype deployed on the Starknet Sepolia testnet, it requires additional work to be production ready.</b>

### Technologies used

**Starknet**: Core blockchain infrastructure, providing a scalable and secure environment for managing smart contracts and transactions.

**Dynamic.xyz**: Used for user authentication and login, enabling secure access to the zkPages platform.

**Voyager**: Integrated for in-app contract interactions and viewing transaction history, providing users with transparency and auditability of their store's activities.

<!-- **Argent**: Treasury and custodian for incoming payments. -->

### Updating the Cairo smart contract

Make any updates to `zkpages.cairo`

From the `/contracts` folder:

`scarb build`

If successful, you should have the casm and sierra output files. Assign the contents into the `casm.ts` and `sierra.ts` object files respectively. The updated contract should now be active in the application.

### Future work


### Screenshots


### Useful links
* https://github.com/shadcn-ui/ui/discussions/790

### License

MIT



