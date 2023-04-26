import {Box, Chip, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

export default function SelectInput(props){

    return (
        <FormControl>
            <InputLabel id="categories-label">{props.text}</InputLabel>
            <Select
                labelId="categories-label"
                label={props.text}
                name="categories"
                multiple
                value={props.selected}
                onChange={props.handleChange}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value.id} label={value.name} />
                        ))}
                    </Box>
                )}
            >
                {props.items.map((item) => (
                    <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
