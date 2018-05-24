import React from 'react';
import gql from 'graphql-tag';
import { getPermissionsQuery as LIST_QUERY } from '../../queries';
import List from '../List';

const DELETE_MUTATION = gql`
mutation deletePermission($id: String!) {
  deletePermission(id:$id) {
    id
    name
  }
}
`;

export default () => (
    <List
        LIST_QUERY={LIST_QUERY}
        DELETE_MUTATION={DELETE_MUTATION}
        route='permission'
        title='Permissions'
    />

);