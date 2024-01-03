import {gql} from "@apollo/react-hooks";

export const ADD_REVIEW = gql`
  mutation AddReview(
    $productId: Int!
    $rating: Int!
    $text: String
  ) {
    addReview (
      productId: $productId
      rating: $rating
      text: $text
    ) {
      status
      errors {
        code
        message
      }
      review {
        id
        userId
        productId
        rating
        text
      }
    }
  }
`;