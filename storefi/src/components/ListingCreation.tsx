import React, {ChangeEvent, Component, JSXElementConstructor, ReactElement, useState} from 'react';
import { Input, TextField, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useMoralis, useWeb3Contract } from "react-moralis";




import styles from './ListingCreation.module.css'
import Moralis from 'moralis-v1/types';
import { Windows } from 'web3uikit';
import abi_Auction_Manager from "../constants/abi_Auction_Manager.json";

const ListingCreation = () => {

    const { isAuthenticated, isWeb3Enabled, account } = useMoralis();

      const [endDate, setEndDate] = useState<Dayjs | null>(
        dayjs('2022-11-21T10:00:00'),
      );

      const handleNewEndDate = (newDate: Dayjs | null) => {
        console.log(newDate);
        setEndDate(newDate);
      };

      const [startPrice, setStartPrice] = useState(0)

      const handleNewPrice = (newPrice: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(newPrice.target.value);
        setStartPrice(newPrice.target.value as unknown as number);
      };

      const { runContractFunction: createNewAuction } = useWeb3Contract({
        abi: abi_Auction_Manager,
        contractAddress: '0x6d11Ad6e55dd70e9056534B77260f2B709bdbF3b', // AUCTION MANAGER ADDRESS
        functionName: "deployAuctionProxy",
        params: {   
            _biddingTime: endDate?.valueOf(),
            _beneficiary: account,
            _minimumBid: startPrice
        },
    })

      async function createNewListing(endDate: dayjs.Dayjs | null, startPrice: number): Promise<void> {
        
        if(endDate == null) {
            window.alert("You have not entered an end date")
            return
        } else if(endDate.isBefore(Date.now())) {
            window.alert("The ending date can not be in the past")
            return
        }
        
        if(startPrice < 0) {
            window.alert("The starting price can not be negative")
            return
        }

        if(!isWeb3Enabled) {
            window.alert("You need to connect to a wallet.")
            return
        }

        // await setUpAuction({
        // })

        await createNewAuction({
            // onComplete:
            // onError:
            onSuccess: handleSuccess,
            onError: (error) => console.log(error),
        })
        
    }

    return (
        <div className={styles.listingCreation}>
            <div>
                <label>Ending date of the listing: </label>
                <div className = {styles.inputItem}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date & Time picker"
                            value={endDate}
                            onChange={(newEndDate) => handleNewEndDate(newEndDate)}
                            renderInput={(params) => <TextField {...params} />}
                        >
                        </DateTimePicker>
                    </LocalizationProvider>
                </div>
            </div>
            <div>
                <label>Starting price: </label>
                <Input
                    value={startPrice}
                    onChange={(newPrice) => handleNewPrice(newPrice)}></Input>
            </div>
            <Button 
                variant="outlined"
                onClick={() => createNewListing(endDate, startPrice)}>Create</Button>
        </div>
    );
}

export default ListingCreation;
function handleSuccess() {
    window.alert("Your listing has been created.")
}

