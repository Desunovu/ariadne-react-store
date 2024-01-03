import {gql} from "@apollo/react-hooks";

export const REMOVE_FROM_FAVORITES = gql`
  mutation RemoveProductFromFavorites(
    $productId: Int!
  ) {
  removeProductFromFavorites(productId: $productId) {
    status
    errors {
      code
      message
    }
  }
}
`