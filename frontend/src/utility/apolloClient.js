import { ApolloClient, InMemoryCache} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext} from "@apollo/client/link/context";

const httpLink = createUploadLink({
    uri: "/api/graphql"
});

const authLink = setContext((_, {headers}) => {
    return {
        headers: {
            ...headers,
            "x-access-token": localStorage.getItem("token") || ""
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;
