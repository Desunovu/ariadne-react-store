import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import {AddToCartButton} from "./AddToCartButton";

const CardActionAreaStyle = {
  flexBasis: "80%",
};

const CardActionsStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexBasis: "20%",
};

const CardStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  height: "200px",
};

function ProductSimpleCard({ product, amount }) {

  return (
    <Grid item key={product.id} md={6}>
      <Card sx={CardStyle} key={product.id}>
        <CardActionArea
          component={Link}
          to={"/product/" + product.id}
          sx={CardActionAreaStyle}
        >
          {product.previewImage && (
            <CardMedia
              sx={{ height: "100%", width: "100%" }}
              component="img"
              image={product.previewImage.url}
              alt={product.previewImage.filename}
            />
          )}
        </CardActionArea>
        <CardActions sx={CardActionsStyle}>
          <Box
            sx={{
              flex: "1 0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "start",
            }}
          >
            <Typography variant="h5">{product.name}</Typography>
            <Typography variant="h6">{product.price} ₽</Typography>
          </Box>
          <AddToCartButton product={product} amount={amount} />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductSimpleCard;
