import {gql} from "@apollo/react-hooks";

export const ADD_PRODUCT = gql`
    mutation AddProduct(
        $name: String!
        $price: Int!
        $amount: Int!
        $description: String!
        $categoryIds: [Int!]
        $characteristicIds: [Int!]
        $images: [Upload!]
    ) {
        addProduct(
            name: $name,
            price: $price,
            amount: $amount,
            description: $description,
            categoryIds: $categoryIds,
            characteristicIds: $characteristicIds
            images: $images
        ){
            status
            errors{message}
            product {
              id
              name
            }
        }
    }
`