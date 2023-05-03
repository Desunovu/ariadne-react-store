import React, {useState} from "react";
import {Container, Grid} from "@mui/material";
import {useMutation, useQuery} from "@apollo/react-hooks";
import ProductSimpleCard from "../ProductSimpleCard";
import {GET_PRODUCTS} from "../../operations/queries/getProducts";
import ErrorsHandler from "../ErrorsHandler";
import {ADD_PRODUCT_TO_CART} from "../../operations/mutations/addProductToCart";
import {REMOVE_PRODUCT_FROM_CART} from "../../operations/mutations/removeProductFromCart";

function ProductsGrid(){
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]);
    const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);
    const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART);
    const { error } = useQuery(
        GET_PRODUCTS, {
            fetchPolicy: "cache-and-network",
            onCompleted: (data) => {
                setErrors(data.getProducts.errors)
                setProducts(data.getProducts.products)
            }
        }
    )

    return (
        <Container spacing={2} maxWidth="md" sx={{mb: 2}}>
            <h3>Список товаров сайта</h3>
            <ErrorsHandler errors={errors} apolloError={error}/>
            <Grid container spacing={5}>
                {products.map((product) => (
                    <ProductSimpleCard product={product} add={addProductToCart} remove={removeProductFromCart}/>
                ))}
            </Grid>
        </Container>
    )

}

export default ProductsGrid;