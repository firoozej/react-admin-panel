import React, { Component } from 'react';
import gql from 'graphql-tag';
import CForm from './CForm';
import Edit from '../Edit';


const ITEM_QUERY = gql`
query getItem($id: String!) {
  items(id:$id) {
    id
    name
    category {
      id
      name
    }
    description
    files {
      path
    }
  }
}
`;

const EDIT_MUTATION = gql`
mutation editItem($id: String!, $name: String!, $category: String!, $description: String, $files: [String]) {
  editItem(id:$id, name: $name, category: $category, description: $description, files: $files) {
    id
    name
    category {
      id
      name
    }
    files {
      path
    }
  }
}
`;

class ItemEdit extends Component {
  render() {
    return (
      <Edit
        ITEM_QUERY={ITEM_QUERY}
        EDIT_MUTATION={EDIT_MUTATION}
        CForm={CForm}
        route='item'
        id={this.props.match.params.id}
      />);

  }
}

export default ItemEdit;