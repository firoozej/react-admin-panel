import React, { Component } from 'react';
import gql from 'graphql-tag';
import CForm from './CForm';
import Edit from '../Edit';

const ITEM_QUERY = gql`
query getRole($id: String!) {
  roles(id:$id) {
    id
    name
  }
}
`;

const EDIT_MUTATION = gql`
mutation editRole($id: String!, $name: String!) {
  editRole(id:$id, name: $name) {
    id
    name
  }
}
`;

class RoleEdit extends Component {
    render() {
        return (
            <Edit
                ITEM_QUERY={ITEM_QUERY}
                EDIT_MUTATION={EDIT_MUTATION}
                CForm={CForm}
                route='role'
                id={this.props.match.params.id}
            />);

    }
}

export default RoleEdit;