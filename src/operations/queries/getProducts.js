import { gql } from "@apollo/react-hooks";

export const GET_PRODUCTS = gql`
  query GetProducts(
    $pagination: Pagination
    $sort: SortGetProducts
  ) {
    getProducts(
      pagination: $pagination
      sort: $sort
    ) {
      status
      errors {
        message
      }
      products {
        id
        name
        price
        amount
        description
        categories {
          name
        }
        previewImage {
          filename
          url
        }
      }
    }
  }
`;
