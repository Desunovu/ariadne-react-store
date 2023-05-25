import {gql} from "@apollo/react-hooks";

export const ADD_PRODUCT_TO_CART = gql`
    mutation AddProductToCart(
        $id: Int!
        $amount: Int
    ) {
        addProductToCart(
            id: $id
            amount: $amount
        ) {
            status
            errors { 
              code
              message
            }
            cartline {
                product {
                    id
                    name
                }
              amount
            }
        }
    }
`