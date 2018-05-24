import React, { Component } from 'react';
import gql from 'graphql-tag';
import { getPermissionsQuery as listQuery } from '../../queries';
import CForm from './CForm';
import Create from '../Create';

const ADD_Mutation = gql`
mutation addPermission($name: String!, $roles: [String]) {
  addPermission(name: $name, roles: $roles) {
    id
    name,
    roles {
        id
        name
    }
  }
}
`;

class PermissionCreate extends Component {

    onUpdate = (cache, { data: { addPermission: item } }) => {
        if (cache.data.data.ROOT_QUERY.permissions) {
            const { permissions } = cache.readQuery({ query: listQuery });
            cache.writeQuery({
                query: listQuery,
                data: { permissions: permissions.concat([item]) }
            });
        }
    };

    render() {
        return <Create 
        ADD_Mutation={ADD_Mutation} 
        onUpdate={this.onUpdate} 
        CForm={CForm}
        route='permission' />
        
    }
}

export default PermissionCreate;