import {gql} from "@apollo/react-hooks";

export const GET_PRODUCT = gql`
  query GetProduct(
    $id: Int!
  ) {
    getProduct(
      id: $id
    ) {
      status
      errors {
        message
      }
      product {
        id
        name
        price
        amount
        reserved
        description
        categories {
          id
          name
        }
        images {
          id
          filename
          url
        }
        reviews {
          id
          userId
          rating
          text
        }
        characteristics {
          characteristicName
          value
        }
      }
    }
  }
`