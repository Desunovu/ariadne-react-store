import { gql } from "@apollo/react-hooks";

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: String
    $email: String
    $password: String
    $firstName: String
    $lastName: String
    $address: String
    $phoneNumber: String
  ) {
    updateUser(
      id: $id
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      address: $address
      phoneNumber: $phoneNumber
    ) {
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