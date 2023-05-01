import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import CartGrid from "../components/cart/CartGrid";

const ComponentPreviews = () => {
    const cart = [
      {
        product: {
            id: 1,
            name: "asd",
            amount: 5,
            price: 6,
            description: "asdasd"
        },
        amount: 2,
      },
      {
        product: {
            id: 2,
            name: "ggggg",
            amount: 50,
            price: 60,
            description: "-"
        },
        amount: 5,
      },
    ];
    const cartTotal = 100;

    return (
      <Previews palette={<PaletteTree />}>
        <ComponentPreview path="/CartGrid">
          <CartGrid cart={cart} cartTotal={cartTotal}/>
        </ComponentPreview>
      </Previews>
    );
}

export default ComponentPreviews