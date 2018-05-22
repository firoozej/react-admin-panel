import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import customFetch from './customFetch';
import authLink from './authLink';
import errorLink from './errorLink';

const httpLink = createHttpLink({
    fetch: customFetch,
});

const Link = ApolloLink.from([
    errorLink,
    authLink,
    httpLink,
]);
export default Link;