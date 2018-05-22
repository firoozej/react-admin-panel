import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import LoginForm from './LoginForm';
import Redirect from 'react-router-dom/es/Redirect';
import withError from '../withError';

const loginMutation = gql`
  mutation login($email: String!,$password: String!) {
    login(email: $email, password: $password) {
      access_token
    }
  }
`;

class Login extends Component {
    state = {
        authenticated: false,
        loading: false,
        error: ''
    };
    onSubmit({email, password}) {
        const onError = this.props.onError;
        this.props.mutate({
            variables: {
                email,
                password
            },
            context: {
                uri: '/default'
            }
        }).then((response) => {
            localStorage.setItem('access_token', response.data.login.access_token);
            this.setState({
                authenticated: true
            })
        }).catch(error => {
            onError(error);
        });
    }

    render() {
        return (
            (this.state.authenticated)
                ? <Redirect to='/' />
                : <LoginForm onSubmit={this.onSubmit.bind(this)}/>
        );
    }
}

export default graphql(loginMutation)(withError(Login));