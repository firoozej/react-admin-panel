import React, { Component } from 'react';
import gql from 'graphql-tag';
import CForm from './CForm';
import Edit from '../Edit';


const ITEM_QUERY = gql`
query getPermission($id: String!) {
  permissions(id:$id) {
    id
    name,
    roles {
        id
        name
    }
  }
}
`;

const EDIT_MUTATION = gql`
mutation editPermission($id: String!, $name: String!, $roles: [String]) {
  editPermission(id:$id, name: $name, roles: $roles) {
    id
    name,
    roles {
        id
        name
    }
  }
}
`;

class PermissionEdit extends Component {
  render() {
    return (
      <Edit
        ITEM_QUERY={ITEM_QUERY}
        EDIT_MUTATION={EDIT_MUTATION}
        CForm={CForm}
        route='permission'
        id={this.props.match.params.id}
      />);

  }
}

export default PermissionEdit;