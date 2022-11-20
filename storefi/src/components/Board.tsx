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
  startBid: number;
  currentBestBid: number;
}

const boardListings: Listing[] = [];

function Board() {

    const { runContractFunction: fetchAddresses } = useWeb3Contract({
      abi: abi_Auction_Factory,
      contractAddress: raffleAddress, // AUCTION FACTORY ADDRESS
      functionName: "deployedAuctionProxies",
      params: {},
  })

  const addresses: string[] = fetchAddresses() as unknown as string[];

  

  addresses.forEach(async x => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { runContractFunction: fetchStartDate, } = useWeb3Contract({
      abi: abi_Auction,
      contractAddress: x, 
      functionName: "AuctionStartedTime",
      params: {},
    })

    const { runContractFunction: fetchEndDate, } = useWeb3Contract({
      abi: abi_Auction,
      contractAddress: x, 
      functionName: "AuctionEndedTime",
      params: {},
    })

    const { runContractFunction: fetchStartBid, } = useWeb3Contract({
      abi: abi_Auction,
      contractAddress: x, 
      functionName: "MinimumBid",
      params: {},
    })

    const { runContractFunction: fetchHighestBid, } = useWeb3Contract({
      abi: abi_Auction,
      contractAddress: x, 
      functionName: "HighestBid",
      params: {},
    })

    const startDate = await fetchStartDate as unknown as number;
    const endDate = await fetchEndDate as unknown as number;
    const startBid = await fetchStartBid as unknown as number;
    const HighestBid = await fetchHighestBid as unknown as number;

    const newAddress: Listing = {
      address: x,
      startDate: startDate,
      endDate: endDate,
      startBid: startBid,
      currentBestBid: HighestBid
    }

    boardListings.push(newAddress)
  })

  return (
    <Grid className="container-grid" container spacing={1}>
      {boardListings.map((item, index) => {
        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <div className={styles.listingCreation}>
              <div>
                <label>Starting date: {item.startDate}</label>
              </div>
              <div>
                <label>End date: {item.endDate}</label>
              </div>
              <div>
                <label>Starting bid: {item.startBid}</label>
              </div>
              <div>
                <label>Current best bid: {item.currentBestBid}</label>
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
