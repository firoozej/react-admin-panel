import React from 'react';
import gql from 'graphql-tag';
import { items as LIST_QUERY } from '../../queries';
import List from '../List';

const DELETE_MUTATION = gql`
mutation deleteItem($id: String!) {
  deleteItem(id:$id) {
    id
    name
  }
}
`;

export default () => (
    <List
        LIST_QUERY={LIST_QUERY}
        DELETE_MUTATION={DELETE_MUTATION}
        route='item'
        title='Items'
        headers={['Name','Category']}
        keys={['name','category.name']}
    />

);