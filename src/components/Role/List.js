import React from 'react';
import gql from 'graphql-tag';
import { rolesQuery as LIST_QUERY } from '../../queries';
import List from '../List';

const DELETE_MUTATION = gql`
mutation deleteRole($id: String!) {
  deleteRole(id:$id) {
    id
    name
  }
}
`;

export default () => (
  <List
    LIST_QUERY={LIST_QUERY}
    DELETE_MUTATION={DELETE_MUTATION}
    route='role'
    title='Roles'
    headers={['Name']}
    keys={['name']}
  />

);