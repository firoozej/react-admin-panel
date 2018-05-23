import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import CForm from './CForm';
import Loading from '../Loading';
import withError from '../withError';
import Error from '../Error';

export const getUserQuery = gql`
  query getUser($id: String!) {
    users(id:$id) {
      id
      name,
      email,
      roles {
          id
          name
      }
    }
  }
`;

const EDIT_MUTATION = gql`
  mutation editUser($id: String!, $name: String!, $email: String!, $password: String, $roles: [String]) {
    editUser(id:$id, name: $name, email: $email, password: $password, roles: $roles) {
      id
      name,
      email,
      roles {
          id
          name
      }
    }
  }
`;

class Edit extends Component {
    state = {
        mutationComplete: false
    };

    onSubmit() {
        arguments[0]({
            variables: {
                id: arguments[1].id,
                name: arguments[1].name,
                email: arguments[1].email,
                password: arguments[1].password,
                roles: arguments[1].roles,
            }
        });
    }

    onMutationCompleted() {
        this.setState({
            mutationComplete: true
        });
    }

    render() {
        if (this.state.mutationComplete) {
            return <Redirect to='/user'/>
        }
        return (
            <Query
                query={getUserQuery}
                variables={{id: this.props.match.params.id}}>
                {({loading, error, data}) => {
                    if (loading) return <Loading/>;
                    if(error) return <Error error={error}/>;
                    return (
                        <Mutation
                            mutation={EDIT_MUTATION}
                            onCompleted={() => this.onMutationCompleted()}
                            onError={this.props.onError}>
                            {(editMutation, {loading}) => (
                                <CForm
                                    onSubmit={this.onSubmit.bind(this, editMutation)}
                                    {...data.users[0]}
                                    mode='edit'
                                    loading={loading}
                                />
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default withError(Edit);