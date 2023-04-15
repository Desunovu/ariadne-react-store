import React, {useState} from "react";
import {Container, Grid} from "@mui/material";
import {useQuery} from "@apollo/react-hooks";
import ProductElement from "./ProductElement";
import {GET_PRODUCTS} from "../../operations/queries/getProducts";

function GetProductsMenu(){
    const [products, setProducts] = useState([]);

    useQuery(
        GET_PRODUCTS, {
            onCompleted: (data) => {
                console.log(data)
                setProducts(data.getProducts.products)
            }
        }
    )

    return (
        <Container spacing={2} maxWidth="md" sx={{mb: 2}}>
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