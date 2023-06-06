import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_FAVORITES} from "../operations/queries/getFavorites";
import {Container, Grid, Typography} from "@mui/material";
import ProductSimpleCard from "../components/product/ProductSimpleCard";
import ErrorsHandler from "../components/ErrorsHandler";

export function Favorites() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [errors, setErrors] = useState([]);

  const {error} = useQuery(GET_FAVORITES, {
    onCompleted: (data) => {
      setErrors(data.getFavoriteProducts.errors)
      if (data.getFavoriteProducts.status) setFavoriteProducts(data.getFavoriteProducts.products)
    }
  })

  return (
    <Container spacing={2} maxWidth="md" sx={{ mb: 2 }}>
      <Typography variant="h5" gutterBottom>Избраные товары</Typography>
      <ErrorsHandler errors={errors} apolloError={error} />
      <Grid container spacing={5}>
        {favoriteProducts.map((favoriteProduct) => (
          <ProductSimpleCard product={favoriteProduct} />
        ))}
      </Grid>
    </Container>
  )
}