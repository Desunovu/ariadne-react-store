import React, {useState} from "react";
import {Container, Grid} from "@mui/material";
import {useQuery} from "@apollo/react-hooks";
import ProductSimpleCard from "../product/ProductSimpleCard";
import {GET_PRODUCTS} from "../../operations/queries/getProducts";
import ErrorsHandler from "../ErrorsHandler";

function ProductsGrid(){
    const [products, setProducts] = useState([]);
    const [errors, setErrors] = useState([]);

    const { error } = useQuery(
        GET_PRODUCTS, {
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
                    <ProductSimpleCard product={product}/>
                ))}
            </Grid>
        </Container>
    )

}

export default ProductsGrid;