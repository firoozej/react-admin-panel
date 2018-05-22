import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import CForm from './CForm';
import {getRolesQuery} from '../../queries';
import withError from '../withError';

const ADD_Mutation = gql`
  mutation addRole($name: String!) {
    addRole(name: $name) {
      id
      name
    }
  }
`;

class Create extends Component {
    state = {
        mutationComplete: false,
        error: false
    };

    onSubmit() {
        arguments[0]({variables: {name: arguments[1].name}});
    }

    onUpdate = (cache, {data: {addRole: item}}) => {
        if(cache.data.data.ROOT_QUERY.roles) {
        const {roles} = cache.readQuery({query: getRolesQuery});
            cache.writeQuery({
                query: getRolesQuery,
                data: {roles: roles.concat([item])}
            });
        }
        this.setState({
            mutationComplete: true
        });
    };

    render() {
        if (this.state.mutationComplete) {
            return <Redirect to='/role'/>
        }
        return (
            <Mutation mutation={ADD_Mutation}
                      update={this.onUpdate}
                      onError={this.props.onError}>
                {(addMutation, {loading}) => {
                    return (
                        <CForm
                            onSubmit={this.onSubmit.bind(this, addMutation)}
                            mode='create'
                            loading={loading}
                        />);
                }}
            </Mutation>
        );
    }
}

export default withError(Create);