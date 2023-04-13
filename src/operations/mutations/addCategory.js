import {gql} from "@apollo/react-hooks";

export const ADD_CATEGORY = gql`
    mutation AddCategory(
        $name: String!
    ){
        addCategory(name: $name){
            status
            errors{message}
            category{id, name}
        }
    }
`;