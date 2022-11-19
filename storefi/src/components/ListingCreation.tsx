import React, {Component, JSXElementConstructor, ReactElement} from 'react';
import { Input, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import styles from './ListingCreation.module.css'

function ListingCreation() {
    return (
        <div className={styles.listingCreation}>
            <label>New Listing:</label>
            <div>
                <label>Name of the listing: </label>
                <Input></Input>
            </div>
            <div>
                <label>Starting date of the listing: </label>
                <input type='date' />
            </div>
            <div>
                <label>Ending date of the listing: </label>
                <input type = 'date'/>
            </div>
            <div>
                <label>Starting price: </label>
                <Input></Input>
            </div>
            <div>
                <label>Immediate buy price: </label>
                <Input></Input>
            </div>
        </div>
    );
}

export default ListingCreation;