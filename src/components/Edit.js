import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Query, Mutation} from 'react-apollo';
import Loading from './Loading';
import withError from './withError';
import Error from './Error';


class Edit extends Component {
    state = {
        mutationComplete: false
    };

    onSubmit(editMutation, vars) {
        editMutation({
            variables: {
                ...vars
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
            return <Redirect to={`/${this.props.route}`}/>
        }
        return (
            <Query
                query={this.props.ITEM_QUERY}
                variables={{id: this.props.id}}>
                {({loading, error, data}) => {
                    if (loading) return <Loading/>;
                    if(error) return <Error error={error}/>;
                    return (
                        <Mutation
                            mutation={this.props.EDIT_MUTATION}
                            onCompleted={() => this.onMutationCompleted()}
                            onError={this.props.onError}>
                            {(editMutation, {loading}) => (
                                <this.props.CForm
                                    onSubmit={this.onSubmit.bind(this, editMutation)}
                                    {...data[Object.keys(data)[0]][0]}
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