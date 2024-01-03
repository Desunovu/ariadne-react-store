import { gql } from "@apollo/react-hooks";

export const GET_ORDERS = gql`
  query GetOrders($userId: Int, $pagination: Pagination, $sort: SortGetOrders) {
    getOrders(userId: $userId, pagination: $pagination, sort: $sort) {
      status
      errors {
        code
        message
      }
      orders {
        id
        userId
        creationDate
        completionDate
        deliveryAddress
        status
        orderLines {
          product {
            id
            name
            price
            amount
            description
            images {
              url
            }
            categories {
              id
              name
            }
            characteristics {
              characteristicName
              value
            }
          }
          amount
        }
      }
    }
  }
`;
