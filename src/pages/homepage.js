import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PRODUCTS } from "../operations/queries/getProducts";
import { Container, Grid } from "@mui/material";
import ErrorsHandler from "../components/ErrorsHandler";
import ProductSimpleCard from "../components/ProductSimpleCard";

function Homepage() {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  const { error: productsError } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setErrors(data.getProducts.errors);
      setProducts(data.getProducts.products);
    },
  });

  return (
    <Container spacing={2} maxWidth="md" sx={{ mb: 2 }}>
      <ErrorsHandler errors={errors} apolloError={productsError} />
      <Grid container spacing={5}>
        {products.map((product) => (
          <ProductSimpleCard product={product} amount={0} />
        ))}
      </Grid>
    </Container>
  );
}

export default Homepage;
