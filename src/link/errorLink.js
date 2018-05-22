import {onError} from "apollo-link-error";

const errorLink = onError(({response, graphQLErrors, networkError}) => {
    if (graphQLErrors)
        // graphQLErrors.map(({message}) => {
        //         response.errors = message;
        //         return null;
        //     }
        // );

    if (networkError) {

    }
});
export default errorLink;