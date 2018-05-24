import React, { Component } from 'react';
import gql from 'graphql-tag';
import CForm from './CForm';
import Edit from '../Edit';


const ITEM_QUERY = gql`
  query getUser($id: String!) {
    users(id:$id) {
      id
      name,
      email,
      roles {
          id
          name
      }
    }
  }
`;

const EDIT_MUTATION = gql`
  mutation editUser($id: String!, $name: String!, $email: String!, $password: String, $roles: [String]) {
    editUser(id:$id, name: $name, email: $email, password: $password, roles: $roles) {
      id
      name,
      email,
      roles {
          id
          name
      }
    }
  }
`;

class UserEdit extends Component {
  render() {
    return (
      <Edit
        ITEM_QUERY={ITEM_QUERY}
        EDIT_MUTATION={EDIT_MUTATION}
        CForm={CForm}
        route='user'
        id={this.props.match.params.id}
      />);

  }
}

export default UserEdit;