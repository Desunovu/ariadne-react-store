import {gql} from "@apollo/react-hooks";

export const CREATE_ORDER = gql`
  mutation {
    createOrder(deliveryAddress: "string") {
      status
      errors {
        code
        message
      }
      order {
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
