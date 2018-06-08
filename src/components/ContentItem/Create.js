import React, { Component } from 'react';
import gql from 'graphql-tag';
import { items as LIST_QUERY } from '../../queries';
import CForm from './CForm';
import Create from '../Create';

const ADD_Mutation = gql`
mutation addItem($name: String!, $category: String!, $description: String, $files: [String]) {
  addItem(name: $name, category: $category, description: $description, files: $files) {
    id
    name,
    category {
        id,
        name
    }
    description
  }
}
`;

class ItemCreate extends Component {

    onUpdate = (cache, { data: { addItem: item } }) => {
        if (cache.data.data.ROOT_QUERY.items) {
            const { items } = cache.readQuery({ query: LIST_QUERY });
            cache.writeQuery({
                query: LIST_QUERY,
                data: { items: items.concat([item]) }
            });
        }
    };

    render() {
        return <Create 
        ADD_Mutation={ADD_Mutation} 
        onUpdate={this.onUpdate} 
        CForm={CForm}
        route='item' />
        
    }
}

export default ItemCreate;