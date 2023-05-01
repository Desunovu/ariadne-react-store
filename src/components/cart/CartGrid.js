import React from "react";
import {Box, Button, Container, Grid, Typography} from "@mui/material";
import ProductSimpleCard from "../ProductSimpleCard";

const CartBoxStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
}

const GridContainerStyle = {
    flexBasis: "80%",
    display: "inline-flex",
    flexDirection: "column",
    marginBottom: "20px",
}

const OrderActionsContainerStyle = {
    flexBasis: "20%",
    display: "inline-flex",
    flexDirection: "column",
    marginBottom: "20px",
}

export default function CartGrid(props) {
  const { cart, cartTotal, add, remove } = props;

  return (
    <>
      <Typography variant={"h5"} gutterBottom>
        Корзина пользователя
      </Typography>
      <Box sx={CartBoxStyle}>
        <Container sx={GridContainerStyle}>
          <Grid container spacing={5}>
            {cart.map((cartLine) => (
              <ProductSimpleCard
                product={cartLine.product}
                amount={cartLine.amount}
                add={add}
                remove={remove}
              />
            ))}
          </Grid>
        </Container>
        <Container sx={OrderActionsContainerStyle}>
          <Typography variant="h5" gutterBottom>Итого: {cartTotal} руб</Typography>
          <Button variant={"contained"}>
            Заказать
          </Button>
        </Container>
      </Box>
    </>
  );
}
