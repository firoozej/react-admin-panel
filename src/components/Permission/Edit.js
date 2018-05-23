import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import CForm from './CForm';
import Loading from '../Loading';
import withError from '../withError';
import Error from '../Error';

export const getPermissionQuery = gql`
  query getPermission($id: String!) {
    permissions(id:$id) {
      id
      name,
      roles {
          id
          name
      }
    }
  }
`;

const editMutation = gql`
  mutation editPermission($id: String!, $name: String!, $roles: [String]) {
    editPermission(id:$id, name: $name, roles: $roles) {
      id
      name,
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
            return <Redirect to='/permission'/>
        }
        return (
            <Query
                query={getPermissionQuery}
                variables={{id: this.props.match.params.id}}>
                {({loading, error, data}) => {
                    if (loading) return <Loading/>;
                    if(error) return <Error error={error}/>;
                    return (
                        <Mutation
                            mutation={editMutation}
                            onCompleted={() => this.onMutationCompleted()}
                            onError={this.props.onError}>
                            {(editRecord, {loading}) => (
                                <CForm
                                    onSubmit={this.onSubmit.bind(this, editRecord)}
                                    {...data.permissions[0]}
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