import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs , Firestore, QuerySnapshot } from "firebase/firestore";
import React, { Component, JSXElementConstructor, ReactElement } from "react";
import { Input, TextField, Button, Grid } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import styles from "./Board.module.css";
const boardListing = [
  {
    name: "Cloud storage",
    startDate: 1668888291,
    endDate: 1668888291,
    startingPrice: 0,
    immediateBuyPrice: 99,
  },
  {
    name: "App storage",
    startDate: 1668888291,
    endDate: 1668888291,
    startingPrice: 0,
    immediateBuyPrice: 99,
  },
];

const firebaseConfig = {
    apiKey: "AIzaSyC_pLy1L2OwUXXnkiV9ejDoXvc-CgYyN9M",
    authDomain: "storefi.firebaseapp.com",
    projectId: "storefi",
    storageBucket: "storefi.appspot.com",
    messagingSenderId: "203827032373",
    appId: "1:203827032373:web:726017c96dbdbc6f4e9c7c",
    measurementId: "G-5NEW7LBEKN"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore(app);
  
  async function fetchAddresses() {
      const addressesSnapshot = await getDocs(collection(db, 'addresses'))
      console.log("there are " + addressesSnapshot.size + " addresses at the moment");
  }

function Board() {
  fetchAddresses();
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
                <label>Start price: {item.startingPrice}</label>
              </div>
              <div>
                <label>Immediate buy price: {item.immediateBuyPrice}</label>
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
