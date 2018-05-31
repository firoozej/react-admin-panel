import React from 'react';
import gql from 'graphql-tag';
import { categories as LIST_QUERY } from '../../queries';
import List from '../List';

const DELETE_MUTATION = gql`
mutation deleteCategory($id: String!) {
  deleteCategory(id:$id) {
    id
    name
  }
}
`;

export default () => (
    <List
        LIST_QUERY={LIST_QUERY}
        DELETE_MUTATION={DELETE_MUTATION}
        route='category'
        title='Categories'
        headers={['Name','Parent']}
        keys={['name','parent']}
    />

);