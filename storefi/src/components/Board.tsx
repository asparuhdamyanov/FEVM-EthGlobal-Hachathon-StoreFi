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

function Board() {
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
