import React, { Component } from 'react';
import gql from 'graphql-tag';
import { categories as LIST_QUERY } from '../../queries';
import CForm from './CForm';
import Create from '../Create';

const ADD_Mutation = gql`
mutation addCategory($name: String!, $parent: String) {
  addCategory(name: $name, parent: $parent) {
    id
    name,
    parent
  }
}
`;

class CategoryCreate extends Component {

    onUpdate = (cache, { data: { addCategory: item } }) => {
        if (cache.data.data.ROOT_QUERY.categories) {
            const { categories } = cache.readQuery({ query: LIST_QUERY });
            cache.writeQuery({
                query: LIST_QUERY,
                data: { categories: categories.concat([item]) }
            });
        }
    };

    render() {
        return <Create 
        ADD_Mutation={ADD_Mutation} 
        onUpdate={this.onUpdate} 
        CForm={CForm}
        route='category' />
        
    }
}

export default CategoryCreate;