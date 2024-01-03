import {gql} from "@apollo/react-hooks";


export const CREATE_CHARACTERISTIC = gql`
    mutation CreateCharacteristic(
        $name: String!
    ){
        createCharacteristic(name: $name){
            status
            errors {message}
            characteristic{id, name}
        }
    }
`;