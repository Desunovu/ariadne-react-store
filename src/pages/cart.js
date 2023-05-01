import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_CART } from "../operations/queries/getCart";
import CartGrid from "../components/cart/CartGrid";
import { ADD_PRODUCT_TO_CART } from "../operations/mutations/addProductToCart";
import {REMOVE_PRODUCT_FROM_CART} from "../operations/mutations/removeProductFromCart";

export default function Cart() {
  const [cart, setCart] = useState();
  const [cartTotal, setCartTotal] = useState();

  const {loading, error } = useQuery(GET_CART, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setCart(data.getCart.cart);
      setCartTotal(data.getCart.cartTotal);
    },
  });

  const [addProductToCart] = useMutation(ADD_PRODUCT_TO_CART);

  const [removeProductFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART);

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    console.log(error);
    // return <ErrorsHandler apolloError={error}/>
  }

  return (
    <div>
      <CartGrid cart={cart} cartTotal={cartTotal} add={addProductToCart} remove={removeProductFromCart}/>
    </div>
  );
}