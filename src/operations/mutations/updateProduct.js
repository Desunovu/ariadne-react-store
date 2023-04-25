import {gql} from "@apollo/react-hooks";

export const UPDATE_PRODUCT = gql`
    mutation UpdateProduct(
            $id: Int!
            $name: String
            $price: Int
            $amount: Int
            $description: String
            $addImages: [Upload!]
            $removeImagesById: [Int!]
            $deleteAllImages: Boolean
            $setCategoriesById: [Int!]
            $setCharacteristicsById: [Int!]
    ) {
        updateProduct(
            id: $id
            name: $name
            price: $price
            amount: $amount
            description: $description
            addImages: $addImages
            removeImagesById: $removeImagesById
            deleteAllImages: $deleteAllImages
            setCategoriesById: $setCategoriesById
            setCharacteristicsById: $setCharacteristicsById
        ) {
            status
            errors {
                code
                message
            }
        }
    }
`