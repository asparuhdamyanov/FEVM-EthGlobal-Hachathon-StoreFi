# StoreFi

### The idea

A decentralized Auction, where potential buyers place competitive bids for Filecoin storage.

There are two participants: **Buyers** & **Sellers**

Sellers list their storage on the platform.

Buyers place bids on storage listings.

After the time for the auction has passed & minimum bid is fulfilled, the Seller and the highest Bidder strike a deal for storage.
(Implemented via the mock logic)

## Example

Seller wants to create a listing.

Seller confirms his address, inputs minimum bid and the Auction time.

Seller invokes LotteryManager's create a Proxy from the UI.


## Technical Specifications

We used a Beacon Proxy Pattern, so we can create N amount of different Auctions

## Start

```shell
# run in the root folder filecoin hardhat project
yarn
# run frontend project
npm install
npm start
```
