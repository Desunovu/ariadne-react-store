import {gql} from "@apollo/react-hooks";

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: Int!, $orderStatus: OrderStatusEnum!) {
    updateOrderStatus(id: $id, orderStatus: $orderStatus) {
      status
      errors {
        code
        message
      }
    }
  }
`;