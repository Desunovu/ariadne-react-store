import {gql} from "@apollo/react-hooks";

export const REMOVE_CATEGORY = gql`
    mutation RemoveCategory(
        $id: Int!
    ){
        removeCategory(id: $id){
            status
            errors{message}
        }
    }
`;