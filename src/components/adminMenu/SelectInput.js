import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

/**
 * Обработчик изменения значения в селекторе.
 *
 * @param {object} event - Событие изменения значения в селекторе.
 * @param {function} setSelectedValues - Функция для обновления состояния выбранных значений в селекторе.
 * @returns {void}
 */
export function handleSelectorChange(event, setSelectedValues) {
    const { value } = event.target;
    setSelectedValues(value);
}

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
            >
                {props.items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
