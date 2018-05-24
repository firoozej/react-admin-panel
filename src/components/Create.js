import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import withError from './withError';


class Create extends Component {
    state = {
        mutationComplete: false,
        error: false
    };

    onSubmit(addMutation, vars) {
        addMutation({
            variables: {
                ...vars

            }
        });
    }

    onMutationCompleted = () => {
        this.setState({
            mutationComplete: true
        });
    };

    render() {
        if (this.state.mutationComplete) {
            return <Redirect to={`/${this.props.route}`} />
        }
        return (
            <Mutation mutation={this.props.ADD_Mutation}
                update={this.props.onUpdate}
                onError={this.props.onError}
                onCompleted={this.onMutationCompleted}
                >
                {(addMutation, { loading }) => {
                    return (
                        <this.props.CForm
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