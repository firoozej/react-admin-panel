import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {AppSidebarNav} from '@coreui/react';
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

const menu = (data) => {
    const names = data.nav.map(item => item.name)
    const menuItems = navigation.items.filter(item => {
        if(item.type === 'item') {
            return names.includes(item.url.slice(1));
        }
        else return true;
    });
    return {items: menuItems};
}

export default (props) => (
    <Query
        query={NAV_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return <Loading menu/>;
            if (error) return <Error error={error} />;
 
            return <AppSidebarNav navConfig={menu(data)} {...props}/>
        }}
    </Query>
)

