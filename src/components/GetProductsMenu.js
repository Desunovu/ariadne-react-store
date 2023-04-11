import React, {useContext, useState} from "react";
import {
    Box,
    Typography,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton, Toolbar, Container, Grid
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import {gql, useQuery} from "@apollo/react-hooks";
import ProductElement from "./ProductElement";

const GET_PRODUCTS = gql`
    query GetProducts(
        $pagination: Pagination
        $sort: SortGetProducts
    ){
        getProducts(
            pagination: $pagination
            sort: $sort
        ){
            status
            errors{ message }
            products{
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

function GetProductsMenu(props){
    const { user } = useContext(AuthContext);
    let navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);

    const {data} = useQuery(
        GET_PRODUCTS, {
            onCompleted: (data) => {
                console.log(data)
                setProducts(data.getProducts.products)
            }
        }
    )

    return (
        <Container spacing={2} maxWidth="md">
            <h3>Список товаров сайта</h3>
            <Grid container spacing={5}>
                {products.map((product) => (
                    <ProductElement product={product}/>
                ))}
            </Grid>
        </Container>
    )

}

export default GetProductsMenu;