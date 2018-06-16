import React, { Component } from 'react';
import gql from 'graphql-tag';
import { notifications as listQuery } from '../../queries';
import CForm from './CForm';
import Create from '../Create';

const ADD_Mutation = gql`
mutation addNotification($text: String!, $users: [String]!) {
  addNotification(text: $text, users: $users) {
    id
    text,
    users {
        id
        name
    }
  }
}
`;

class NotificationCreate extends Component {

    onUpdate = (cache, { data: { addNotification: item } }) => {
        if (cache.data.data.ROOT_QUERY.notifications) {
            const { notifications } = cache.readQuery({ query: listQuery });
            cache.writeQuery({
                query: listQuery,
                data: { notifications: notifications.concat([item]) }
            });
        }
    };

    render() {
        return <Create 
        ADD_Mutation={ADD_Mutation} 
        onUpdate={this.onUpdate} 
        CForm={CForm}
        route='notification' />
        
    }
}

export default NotificationCreate;