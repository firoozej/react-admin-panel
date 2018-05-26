import React, { Component } from 'react';
import gql from 'graphql-tag';
import { rolesQuery as listQuery } from '../../queries';
import CForm from './CForm';
import Create from '../Create';

const ADD_Mutation = gql`
  mutation addRole($name: String!) {
    addRole(name: $name) {
      id
      name
    }
  }
`;

class RoleCreate extends Component {

    onUpdate = (cache, { data: { addRole: item } }) => {
        if (cache.data.data.ROOT_QUERY.roles) {
            const { roles } = cache.readQuery({ query: listQuery });
            cache.writeQuery({
                query: listQuery,
                data: { roles: roles.concat([item]) }
            });
        }
    };

    render() {
        return <Create 
        ADD_Mutation={ADD_Mutation} 
        onUpdate={this.onUpdate} 
        CForm={CForm}
        route='role' />
        
    }
}

export default RoleCreate;