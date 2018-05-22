import {execute, makePromise} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import gql from 'graphql-tag';

const customFetch = (uri, options) => {

    // This reference to the refreshingPromise will let us check later on if we are executing getting the refresh token.
    this.refreshingPromise = null;

    // Create initial fetch, this is what would normally be executed in the link without the override
    let initialRequest;
    if (uri !== '/graphql') initialRequest = fetch(`/graphql${uri}`, {...options, credentials: 'same-origin'});
    else initialRequest = fetch(`/graphql`, {...options, credentials: 'same-origin'});

    // The apolloHttpLink expects that whatever fetch function is used, it returns a promise.
    // Here we return the initialRequest promise
    return initialRequest.then((response) => {
        // We should now have the JSON from the response of initialRequest
        // We check that we do and look for errors from the GraphQL server
        // If it has the error 'User is not logged in' (that's our implementation of a 401) we execute the next steps in the re-auth flow
        if (response.status === 401) {
            if (!this.refreshingPromise) {
                // Execute the re-authorization request and set the promise returned to this.refreshingPromise
                const operation = {
                    query: gql`{
                        refreshToken {
                            access_token
                        }
                    }`
                };
                const link = createHttpLink({
                    uri: '/graphql/default',
                    credentials: 'same-origin'
                });
                this.refreshingPromise = makePromise(execute(link, operation))
                    .then((refresh_token_repsonse) => {
                        if (refresh_token_repsonse.data.refreshToken.access_token) {
                            return Promise.resolve(refresh_token_repsonse.data.refreshToken.access_token)
                        }
                        else {
                            return Promise.reject('refresh token failed')
                        }
                    })
            }
            return this.refreshingPromise.then((newAccessToken) => {
                // Now that the refreshing promise has been executed, set it to null
                this.refreshingPromise = null;

                // Set the authorization header on the original options parameter to the new access token we got
                localStorage.setItem('access_token', newAccessToken);
                options.headers.authorization = `Bearer ${newAccessToken}`;
                // Return the promise from the new fetch (which should now have used an active access token)
                // If the initialRequest had errors, this fetch that is returned below is the final result.
                return fetch(uri, {...options, credentials: 'same-origin'});
            }).catch(error => {
                console.log(error);
            })
        }
        return response;
    });
};
export default customFetch;