import {gql} from "@apollo/react-hooks";

export const REMOVE_PRODUCT_FROM_CART = gql`
    mutation RemoveProductFromCart(
        $id: Int!
        $amount: Int
        $all: Boolean
    ) {
        removeProductFromCart(
            id: $id
            amount: $amount
            all: $all
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