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
            $setImageAsPreviewById: Int
            $addCategoriesById: [Int!]
            $removeCategoriesById: [Int!]
            $removeAllCategories: Boolean
            $addCharacteristicByIds: [Int!]
            $removeCharacteristicByIds: [Int!]
            $removeAllCharacteristics: Boolean
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
            setImageAsPreviewById: $setImageAsPreviewById
            addCategoriesById: $addCategoriesById
            removeCategoriesById: $removeCategoriesById
            removeAllCategories: $removeAllCategories
            addCharacteristicByIds: $addCharacteristicByIds
            removeCharacteristicByIds: $removeCharacteristicByIds
            removeAllCharacteristics: $removeAllCharacteristics
        ) {
            status
            errors {
                code
                message
            }
        }
    }
`