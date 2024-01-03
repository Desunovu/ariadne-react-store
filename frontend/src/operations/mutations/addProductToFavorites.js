import {gql} from "@apollo/react-hooks";

export const ADD_TO_FAVORITES = gql`
  mutation AddProductToFavorites(
    $productId: Int!
  ) {
  addProductToFavorites(productId: $productId) {
    status
    errors {
      code
      message
    }
    product {
      id
    }
  }
}
`