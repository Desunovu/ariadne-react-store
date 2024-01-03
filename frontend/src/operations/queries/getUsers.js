import { gql } from "@apollo/react-hooks";

export const GET_USERS = gql`
  query GetUsers($pagination: Pagination, $sort: SortGetUsers) {
    getUsers(pagination: $pagination, sort: $sort) {
      status
      errors {
        code
        message
      }
      users {
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