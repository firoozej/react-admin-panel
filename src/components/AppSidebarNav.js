import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { AppSidebarNav } from '@coreui/react';
import navigation from '../_nav';
import Error from './Error';
import Loading from './Loading';


const NAV_QUERY = gql`
{
    nav {
        name
    }
}
`;
const filterChildren = (item, names) => {
    item.children = item.children.reduce((acc, item) => {
        let hasPermission = item.type === 'item' && names.includes(item.url.slice(1));
        if (hasPermission) {
            return acc.concat(item);
        }
        else {
            return acc;
        }
    }, []);
}
const menu = (data) => {
    const names = data.nav.map(item => item.name);
    let items = navigation.items.reduce((acc, item) => {
        let hasPermission = item.type === 'item' && names.includes(item.url.slice(1));
        if (hasPermission) {
            if (item.children) {
                filterChildren(item, names);
            }
            return (item.children && item.children.length === 0) ? acc : acc.concat(item);
        }
        else if (item.children) {
            filterChildren(item, names);
            return (item.children.length === 0) ? acc : acc.concat(item);
        }
        else return acc.concat(item);
    }, []);
    return { items };
}

export default (props) => (
    <Query
        query={NAV_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return <Loading menu />;
            if (error) return <Error error={error} />;

            return <AppSidebarNav navConfig={menu(data)} {...props} />
        }}
    </Query>
)

