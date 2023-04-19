import {gql} from "@apollo/react-hooks";

export const ADD_PRODUCT = gql`
    mutation AddProduct(
        $name: String!
        $price: Int!
        $amount: Int!
        $description: String!
        $categoryIds: [Int!]
        $characteristicIds: [Int!]
    ) {
        addProduct(
            name: $name,
            price: $price,
            amount: $amount,
            description: $description,
            categoryIds: $categoryIds,
            characteristicIds: $characteristicIds
        ){
            status
            errors{message}
            product {
              id
              name
              price
              amount
              reserved
              description
              categories{name}
              images{url}
              reviews{text}
              characteristics{characteristicName, value}
            }
        }
    }
`