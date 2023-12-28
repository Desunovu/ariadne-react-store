import { gql } from "@apollo/react-hooks";

export const GET_USER = gql`
  query GetUser($id: Int) {
    getUser(id: $id) {
      status
      errors {
        code
        message
      }
      user {
        id
        email
        role
        avatarUrl
        firstName
        lastName
        address
        phoneNumber
      }
    }
  }
`;
