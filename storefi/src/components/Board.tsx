/* eslint-disable react-hooks/rules-of-hooks */
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs , Firestore, QuerySnapshot } from "firebase/firestore";
import { Input, Button, Grid } from "@mui/material";


import styles from "./Board.module.css";
import { useWeb3Contract, Web3ExecuteFunctionParameters } from "react-moralis";

import abi_Auction_Factory from "../constants/abi_Auction_Factory.json";
import abi_Auction from "../constants/abi_Auction_Factory.json";

import { ResolveCallOptions } from "react-moralis/lib/hooks/internal/_useResolveAsyncCall";

interface Listing {
  address: string;
  startDate: number;
  endDate: number;
  currentBestBid: number;
}

const boardListings: Listing[] = [];

async function Board() {

    const { runContractFunction: fetchAddresses } = useWeb3Contract({
      abi: abi_Auction_Factory,
      contractAddress: raffleAddress, // AUCTION FACTORY ADDRESS
      functionName: "deployedAuctionProxies",
      params: {},
  })

  const addresses: string[] = await fetchAddresses() as unknown as string[];

  

  addresses.forEach(x => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { runContractFunction: fetchStartDate, } = useWeb3Contract({
      abi: abi_Auction,
      contractAddress: x, // AUCTION FACTORY ADDRESS
      functionName: "AuctionStartedTime",
      params: {},
    })

    const { runContractFunction: fetchEndDate, } = useWeb3Contract({
      abi: abi_Auction,
      contractAddress: x, // AUCTION FACTORY ADDRESS
      functionName: "AuctionEndedTime",
      params: {},
    })

    const { runContractFunction: fetchStartBid, } = useWeb3Contract({
      abi: abi_Auction,
      contractAddress: x, // AUCTION FACTORY ADDRESS
      functionName: "MinimumBid",
      params: {},
    })

    const { runContractFunction: fetchHighestBid, } = useWeb3Contract({
      abi: abi_Auction,
      contractAddress: x, // AUCTION FACTORY ADDRESS
      functionName: "HighestBid",
      params: {},
    })


  })

  return (
    <Grid className="container-grid" container spacing={1}>
      {boardListing.map((item, index) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div className={styles.listingCreation}>
              <div>
                <label>{item.name}</label>
              </div>
              <div>
                <label>Starting date: {item.startDate}</label>
              </div>
              <div>
                <label>End date: {item.endDate}</label>
              </div>
              <div>
                <label>Current best bid: {item.startingPrice}</label>
              </div>
              <div>
                <label>Bid for price: </label>
                <Input></Input>
              </div>
              <Button variant="outlined">Bid</Button>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Board;
