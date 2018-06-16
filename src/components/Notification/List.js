import React from 'react';
import gql from 'graphql-tag';
import { notifications as LIST_QUERY } from '../../queries';
import List from '../List';

const DELETE_MUTATION = gql`
mutation deleteNotification($id: String!) {
  deleteNotification(id:$id) {
    id
    text
  }
}
`;

export default () => (
    <List
        LIST_QUERY={LIST_QUERY}
        DELETE_MUTATION={DELETE_MUTATION}
        route='notification'
        title='Notifications'
        headers={['Text']}
        keys={['text']}
    />

);