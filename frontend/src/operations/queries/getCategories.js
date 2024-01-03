import {gql} from "@apollo/react-hooks";

export const GET_CATEGORIES = gql`
    query GetCategories(
        $pagination: Pagination
        $sort: SortGetProducts
    ){
        getCategories(
            pagination: $pagination
            sort: $sort
        ){
            status
            errors{message}
            categories{
                id
                name
            }
        }
    }
`;