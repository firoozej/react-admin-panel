import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import CForm from './CForm';
import Loading from '../Loading';
import withError from '../withError';
import Error from '../Error';

export const getRoleQuery = gql`
  query getRole($id: String!) {
    roles(id:$id) {
      id
      name
    }
  }
`;

const editMutation = gql`
  mutation editRole($id: String!, $name: String!) {
    editRole(id:$id, name: $name) {
      id
      name
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
                name: arguments[1].name
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
            return <Redirect to='/role'/>
        }
        return (
            <Query
                query={getRoleQuery}
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
                                    {...data.roles[0]}
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