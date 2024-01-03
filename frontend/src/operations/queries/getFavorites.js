import {gql} from "@apollo/react-hooks";

export const GET_FAVORITES = gql`
  query GetFavoriteProducts {
    getFavoriteProducts {
      status
      errors {
        code
        message
      }
      products {
        id
        name
        price
        previewImage {
          url
          filename
        }
      }
    }
  }
`