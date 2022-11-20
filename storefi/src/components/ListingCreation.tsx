import React, {Component, JSXElementConstructor, ReactElement} from 'react';
import { Input, TextField, Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';



import styles from './ListingCreation.module.css'

function ListingCreation() {
    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
      );

      const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
      };

    return (
        <div className={styles.listingCreation}>
            <label>New Listing:</label>
            <div className = {styles.inputItem}>
                <label>Name of the listing: </label>
                <Input></Input>
            </div>
            <div>
                <label>Starting date of the listing: </label>
                <div className = {styles.inputItem}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date & Time picker"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        >
                        </DateTimePicker>
                    </LocalizationProvider>
                </div>
            </div>
            <div>
                <label>Ending date of the listing: </label>
                <div className = {styles.inputItem}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date & Time picker"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        >
                        </DateTimePicker>
                    </LocalizationProvider>
                </div>
            </div>
            <div>
                <label>Starting price: </label>
                <Input></Input>
            </div>
            <div>
                <label>Immediate buy price: </label>
                <Input></Input>
            </div>
            <Button variant="outlined">Create</Button>
        </div>
    );
}

export default ListingCreation;