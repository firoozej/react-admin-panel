import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import Link from './link';

const Client = new ApolloClient({
    link: Link,
    cache: new InMemoryCache()
});
export default Client;