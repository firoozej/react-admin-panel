import React, { Component } from 'react';
import gql from 'graphql-tag';
import { getUsersQuery as listQuery } from '../../queries';
import CForm from './CForm';
import Create from '../Create';

const ADD_Mutation = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $roles: [String]) {
    addUser(name: $name, email: $email, password: $password, roles: $roles) {
      id
      name,
      email,
      password,
      roles {
          id
          name
      }
    }
  }
`;

class UserCreate extends Component {

    onUpdate = (cache, { data: { addUser: item } }) => {
        if (cache.data.data.ROOT_QUERY.users) {
            const { users } = cache.readQuery({ query: listQuery });
            cache.writeQuery({
                query: listQuery,
                data: { users: users.concat([item]) }
            });
        }
    };

    render() {
        return <Create 
        ADD_Mutation={ADD_Mutation} 
        onUpdate={this.onUpdate} 
        CForm={CForm}
        route='user' />
        
    }
}

export default UserCreate;