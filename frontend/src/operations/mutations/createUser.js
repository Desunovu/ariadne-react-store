import { gql } from "@apollo/react-hooks";

export const CREATE_USER = gql`
    mutation CreateUser(
        $email: String!
        $password: String!
    ) {
        createUser(email: $email, password: $password){
            status
            errors{message}
            user{email}
        }
    }
`;