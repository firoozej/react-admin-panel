import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
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
    onSubmit({ email, password }) {
        
        this.setState({
            loading: true
        });
        
        
        this.props.mutate({
            variables: {
                email,
                password
            },
            context: {
                uri: '/default'
            }
        })
        .then((response) => {
            localStorage.setItem('access_token', response.data.login.access_token);
            
            this.setState({
                authenticated: true,
                loading: false
            });

        })
        .catch(error => {
            this.setState({
                loading: false
            });
            this.props.onError(error);
        });
    }

    render() {
        if (this.state.authenticated)
            return <Redirect to='/' />;

        return <LoginForm onSubmit={this.onSubmit.bind(this)} loading={this.state.loading} />

    }
}

export default graphql(loginMutation)(withError(Login));