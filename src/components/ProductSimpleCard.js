import React, {useCallback, useState} from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import { Link } from "react-router-dom";

const CardActionAreaStyle = {
  flexBasis: "80%",
};

const CardActionsStyle = {
  flexBasis: "20%",
};

const CardStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignContent: "center",
  height: "200px",
};

const ButtonGroupStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
};

const ButtonStyle = {
  whiteSpace: "nowrap",
};

function ProductSimpleCard(props) {
  const { product, amount, add, remove } = props;
  const [stateAmount, setStateAmount] = useState(amount)

  const onButtonClick = useCallback(() => {
    add({
      variables: {
        id: product.id,
        amount: 1,
      },
      onCompleted: (data) => {
        console.log(data)
        if (data.addProductToCart.status) { setStateAmount(data.addProductToCart.cartline.amount) }
      },
    });
  }, []);


  const onButtonClick_1 = useCallback(() => {
    remove({
      variables: {
        id: product.id,
        amount: 1,
      },
      onCompleted: (data) => {
        if (data.removeProductFromCart.status) { setStateAmount(data.removeProductFromCart.cartline.amount) }
      },
    });
    console.log("Нажато убавить");
  }, []);

  return (
    <Grid item key={product.id} md={6}>
      <Card sx={CardStyle} key={product.id}>
        <CardActionArea
          component={Link}
          to={"/product/" + product.id}
          sx={CardActionAreaStyle}
        >
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <b>Количество:</b> {product.amount}
            <br />
            <b>Стоимость:</b> {product.price} ₽<br />
            <b>Описание:</b> {product.description}
            <br />
          </CardContent>
        </CardActionArea>
        <CardActions sx={CardActionsStyle}>
          {!stateAmount && <Button sx={ButtonStyle} onClick={onButtonClick}>В корзину</Button>}
          {stateAmount && (
            <ButtonGroup sx={ButtonGroupStyle}>
              <Button onClick={onButtonClick}>+</Button>
              <Button sx={{ pointerEvents: "none" }}>{stateAmount}</Button>
              <Button onClick={onButtonClick_1}>-</Button>
            </ButtonGroup>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}

export default ProductSimpleCard;
