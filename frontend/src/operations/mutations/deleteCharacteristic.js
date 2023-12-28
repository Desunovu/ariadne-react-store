import {gql} from "@apollo/react-hooks";


export const DELETE_CHARACTERISTIC = gql`
    mutation DeleteCharacteristic(
        $id: Int!
    ){
        deleteCharacteristic(id: $id){
            status
            errors {message}
            characteristic{id, name}
        }
    }
`;