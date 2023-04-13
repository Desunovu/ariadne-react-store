import React, {useContext, useState} from "react";
import {useForm} from "../../utility/hooks";
import {
    Box,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton, Toolbar, Stack, TextField, Container, Select, MenuItem, InputLabel, FormControl, Chip
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {gql, useMutation, useQuery} from "@apollo/react-hooks";

import {GET_CATEGORIES} from "../../operations/queries/getCategories";

const ADD_PRODUCT = gql`
    mutation AddProduct(
        $name: String!
        $price: Int!
        $amount: Int!
        $description: String!
        $categoryIds: [Int!]
    ) {
        addProduct(
            name: $name,
            price: $price,
            amount: $amount,
            description: $description,
            categoryIds: $categoryIds
        ){
            status
            errors{message}
            product {
              id
              name
              price
              amount
              reserved
              description
              categories{name}
              images{url}
              reviews{text}
              characteristics{characteristicName, value}
            }
        }
    }
`

function ProductMenu(props) {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const { refetch } = useQuery(
        GET_CATEGORIES, {
            onCompleted: (data) => {
                setCategories(data.getCategories.categories);
                console.log(data.getCategories.categories);
            }
        }
    );

    const [addProduct, {}] = useMutation(
        ADD_PRODUCT,
        {onCompleted: (data) => {
                console.log(data)
            }}
    );

    function addProductCallback() {
        addProduct({
            variables:{
                name: values.name,
                price: parseInt(values.price),
                amount: parseInt(values.amount),
                description: values.description,
                categoryIds: Array.from(selectedCategories, category => category.id)
            }
        });
        console.log("add product callback hit")
    }

    const { onChange, onSubmit, values } = useForm(addProductCallback, {
        name: "Новый товар",
        price: "100",
        amount: "10",
        description: "Описание товара",
        categoryIds: [],
        images: [],
        characteristics: []
    })

    function handleCategoriesChange(event) {
        const { value } = event.target;
        setSelectedCategories(value);
    }

    return (
        <>
            <Container spacing={2} maxWidth="md">
                <h3> Добавление нового товара в базу </h3>
                <Stack spacing={2} paddingBottom={2}>
                    <TextField
                        label="Название"
                        defaultValue={values.name}
                        name="name"
                        onChange={onChange}
                    />
                    <TextField
                        label="Стоимость"
                        defaultValue={values.price}
                        name="price"
                        onChange={onChange}
                    />
                    <TextField
                        label="Количество на складе"
                        defaultValue={values.amount}
                        name="amount"
                        onChange={onChange}
                    />
                    <TextField
                        label="Описание"
                        defaultValue={values.description}
                        name="description"
                        onChange={onChange}
                    />
                    <FormControl>
                        <InputLabel id="categories-label">Категории</InputLabel>
                        <Select
                            labelId="categories-label"
                            label="Категории"
                            name="categories"
                            multiple
                            value={selectedCategories}
                            onChange={handleCategoriesChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value.id} label={value.name} />
                                    ))}
                                </Box>
                            )}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Button variant="contained" onClick={onSubmit}>Постучаться</Button>
            </Container>

        </>
    )
}

export default ProductMenu;