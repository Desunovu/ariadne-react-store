import {gql} from "@apollo/react-hooks";

export const GET_CART = gql`
    query GetCart(
        $userId: Int
    ){
        getCart(
            userId: $userId
        ){
            status
            errors{message}
            cart{
                product{
                    id
                    name
                    amount
                    price
                    description
                    categories {
                      name
                    }
                    previewImage {
                      filename
                      url
                    }
                }
                amount
            }
            cartTotal
        }
    }
`;