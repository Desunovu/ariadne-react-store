import React, { useCallback, useState } from "react";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import { useMutation } from "@apollo/react-hooks";
import { ADD_PRODUCT_TO_CART } from "../../operations/mutations/addProductToCart";
import { REMOVE_PRODUCT_FROM_CART } from "../../operations/mutations/removeProductFromCart";

const ButtonGroupStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
};

const ButtonStyle = {
  whiteSpace: "nowrap",
};

export function AddToCartButton({ product, amount }) {
  const [stateAmount, setStateAmount] = useState(amount);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState(amount?"Количество:":undefined)

  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);
  const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART);

  const onIncreaseButtonClick = useCallback(() => {
    addProductToCart({
      variables: {
        id: product.id,
        amount: 1,
      },
      onCompleted: (data) => {
        if (data.addProductToCart.status) {
          setStateAmount(data.addProductToCart.cartline.amount);
        }
        else {
          setIsDisabled(true)
          if (data.addProductToCart.errors.find(error => error.code === 6)) setMessage("Уже в корзине!")
        }
      },
    });
  }, [addProductToCart, product.id]);

  const onDecreaseButtonClick = useCallback(() => {
    removeProductFromCart({
      variables: {
        id: product.id,
        amount: 1,
      },
      onCompleted: (data) => {
        if (data.removeProductFromCart.status) {
          setStateAmount(data.removeProductFromCart.cartline.amount);
        }
        else {
          setIsDisabled(true)
        }
      },
    });
  }, [removeProductFromCart, product.id]);

  return (
    <Box>
      {!stateAmount && product.amount > 0 && (
        <Box>
          {isDisabled && <Typography>{message}</Typography>}
          <Button
            disabled={isDisabled}
            sx={ButtonStyle}
            onClick={onIncreaseButtonClick}
          >
            В корзину
          </Button>
        </Box>
      )}
      {product.amount <= 0 && <Button disabled>Товар закончился</Button>}
      {!!stateAmount && (
        <Box>
          {!isDisabled && <Typography>{message}</Typography>}
          <ButtonGroup sx={ButtonGroupStyle}>
            <Button
              disabled={stateAmount <= 0 || isDisabled}
              onClick={onDecreaseButtonClick}
            >
              -
            </Button>
            <Button sx={{ pointerEvents: "none" }}>{stateAmount}</Button>
            <Button
              disabled={product.amount <= stateAmount || isDisabled}
              onClick={onIncreaseButtonClick}
            >
              +
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
}