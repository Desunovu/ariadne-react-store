import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_CART } from "../operations/queries/getCart";
import { CREATE_ORDER } from "../operations/mutations/createOrder";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ProductSimpleCard from "../components/product/ProductSimpleCard";

const CartBoxStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginTop: "25px",
};

const GridContainerStyle = {
  flexBasis: "80%",
  display: "inline-flex",
  flexDirection: "column",
  marginBottom: "20px",
};

const OrderActionsContainerStyle = {
  flexBasis: "20%",
  display: "inline-flex",
  flexDirection: "column",
  marginBottom: "20px",
};

export default function Cart() {
  const [cart, setCart] = useState();
  const [cartTotal, setCartTotal] = useState();
  const [status, setStatus] = useState(false);

  const { refetch } = useQuery(GET_CART, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setCart(data.getCart.cart);
      setCartTotal(data.getCart.cartTotal);
    },
  });
  const [createOrder, { loading }] = useMutation(CREATE_ORDER);

  const onButtonClick = useCallback(() => {
    createOrder({
      onCompleted: (data) => {
        setStatus(data.createOrder.status);
      },
    });
  }, [createOrder]);

  const onButtonMouseOver = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <Box sx={CartBoxStyle}>
      {status && <Alert color={"success"}>Заказ успешно создан!</Alert>}
      <Container sx={GridContainerStyle}>
        <Grid container spacing={5}>
          {cart &&
            !status &&
            cart.map((cartLine) => (
              <ProductSimpleCard
                key={cartLine.product.id}
                product={cartLine.product}
                amount={cartLine.amount}
              />
            ))}
        </Grid>
      </Container>

      <Container sx={OrderActionsContainerStyle}>
        {!!cartTotal && (
          <Typography variant="h5" gutterBottom>
            Итого: {cartTotal} руб
          </Typography>
        )}
        {!status && (
          <Button
            variant={"contained"}
            onClick={onButtonClick}
            onMouseOver={onButtonMouseOver}
          >
            Заказать
            {loading && <CircularProgress color={"inherit"} />}
          </Button>
        )}
      </Container>
    </Box>
  );
}
