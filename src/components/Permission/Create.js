import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import CForm from './CForm';
import {getPermissionsQuery} from '../../queries';
import withError from '../withError';

const ADD_Mutation = gql`
  mutation addPermission($name: String!, $roles: [String]) {
    addPermission(name: $name, roles: $roles) {
      id
      name,
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
            name: arguments[1].name,
            roles: arguments[1].roles
        
        }});
    }

    onUpdate = (cache, {data: {addPermission: item}}) => {
        if(cache.data.data.ROOT_QUERY.permissions) {
        const {permissions} = cache.readQuery({query: getPermissionsQuery});
            cache.writeQuery({
                query: getPermissionsQuery,
                data: {permissions: permissions.concat([item])}
            });
        }
        this.setState({
            mutationComplete: true
        });
    };

    render() {
        if (this.state.mutationComplete) {
            return <Redirect to='/permission'/>
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