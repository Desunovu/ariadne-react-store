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
    ListItemButton, Toolbar, Stack, TextField, Container
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";
import {gql, useMutation} from "@apollo/react-hooks";

const ADD_PRODUCT = gql`
    mutation AddProduct(
        $name: String!
        $price: Int!
        $amount: Int!
        $description: String!
    ) {
        addProduct(
            name: $name,
            price: $price,
            amount: $amount,
            description: $description,
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
                description: values.description
            }
        });
        console.log("add product callback hit")
    }

    const { onChange, onSubmit, values } = useForm(addProductCallback, {
        name: "Новый товар",
        price: "100",
        amount: "10",
        description: "Описание товара",
        categories: [],
        images: [],
        characteristics: []
    })


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
                </Stack>
                <Button variant="contained" onClick={onSubmit}>Постучаться</Button>
            </Container>

        </>
    )
}

export default ProductMenu;