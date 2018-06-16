import React, { Component } from 'react';
import gql from 'graphql-tag';
import CForm from './CForm';
import Edit from '../Edit';


const ITEM_QUERY = gql`
query getNotification($id: String!) {
  notifications(id:$id) {
    id
    text,
    users {
        id
        name
    }
  }
}
`;

const EDIT_MUTATION = gql`
mutation editNotification($id: String!, $text: String!, $users: [String]) {
  editNotification(id:$id, text: $text, users: $users) {
    id
    text,
    users {
        id
        name
    }
  }
}
`;

class NotificationEdit extends Component {
  render() {
    return (
      <Edit
        ITEM_QUERY={ITEM_QUERY}
        EDIT_MUTATION={EDIT_MUTATION}
        CForm={CForm}
        route='notification'
        id={this.props.match.params.id}
      />);

  }
}

export default NotificationEdit;