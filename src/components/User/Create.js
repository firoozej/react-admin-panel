import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import CForm from './CForm';
import {getUsersQuery} from '../../queries';
import withError from '../withError';

const ADD_Mutation = gql`
  mutation addUser($name: String!, $email: String!, $password: String!, $roles: [String]) {
    addUser(name: $name, email: $email, password: $password, roles: $roles) {
      id
      name,
      email,
      password,
      roles {
          id
          name
      }
    }
  }
`;

class Create extends Component {
    state = {
        mutationComplete: false,
        error: false
    };

    onSubmit() {
        arguments[0]({variables: {
            email: arguments[1].email,
            password: arguments[1].password,
            name: arguments[1].name,
            roles: arguments[1].roles
        
        }});
    }

    onUpdate = (cache, {data: {addUser: item}}) => {
        if(cache.data.data.ROOT_QUERY.users) {
        const {users} = cache.readQuery({query: getUsersQuery});
            cache.writeQuery({
                query: getUsersQuery,
                data: {users: users.concat([item])}
            });
        }
        this.setState({
            mutationComplete: true
        });
    };

    render() {
        if (this.state.mutationComplete) {
            return <Redirect to='/user'/>
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