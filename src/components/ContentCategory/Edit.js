import React, { Component } from 'react';
import gql from 'graphql-tag';
import CForm from './CForm';
import Edit from '../Edit';


const ITEM_QUERY = gql`
query getCategory($id: String!) {
  categories(id:$id) {
    id
    name,
    parent
  }
}
`;

const EDIT_MUTATION = gql`
mutation editCategory($id: String!, $name: String!, $parent: String) {
  editCategory(id:$id, name: $name, parent: $parent) {
    id
    name,
    parent
  }
}
`;

class CategoryEdit extends Component {
  render() {
    return (
      <Edit
        ITEM_QUERY={ITEM_QUERY}
        EDIT_MUTATION={EDIT_MUTATION}
        CForm={CForm}
        route='category'
        id={this.props.match.params.id}
      />);

  }
}

export default CategoryEdit;