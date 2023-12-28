import {gql} from "@apollo/react-hooks";

export const GET_CHARACTERISTICS = gql`
    query GetCharacteristics{
        getCharacteristics{
            id
            name
        }
    }
`;