import {gql} from "@apollo/react-hooks";

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar(
    $userId: Int!
  ) {
  uploadAvatar(userId: $userId) {
    status
    errors {
      code
      message
    }
    presignedUrl
  }
}
`