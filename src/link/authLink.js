import {setContext} from "apollo-link-context/lib/index";

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('access_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            accept: 'application/json',
            authorization: token ? `Bearer ${token}` : '',
        }
    }
});

export default authLink;