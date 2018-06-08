import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Client from '../client';
import App from './App';
import withAuth from './withAuth';
import Login from './Login/Login';
import ErrorContext from '../context/error';
import ErrorModal from './ErrorModal';

class Root extends Component {
    state = {
        modal: false,
        message: '',
    };

    onError = (Error) => {
        let error;
        if (Error.networkError) {
            error = Error.networkError.message;
        }
        if (Error.graphQLErrors.length) {
            error = Error.graphQLErrors.reduce(
                (accumulator, currentValue) => accumulator + currentValue.message
                , '');
        }
        this.setState({
            modal: true,
            message: error
        });
    };

    onCloseError = () => {
        this.setState({
            modal: false
        });
    };

    render() {
        const withAuthApp = withAuth(App);
        return (
            <React.Fragment>
                <ErrorContext.Provider value={this.onError}>
                    <ApolloProvider client={Client}>
                        <BrowserRouter>
                            <Switch>
                                <Route path='/login' name='Login' component={Login} />
                                <Route path='/' name='Home' component={withAuthApp} />
                            </Switch>
                        </BrowserRouter>
                    </ApolloProvider>
                </ErrorContext.Provider>
                <ErrorModal
                    isOpen={this.state.modal}
                    message={this.state.message}
                    onCloseClicked={this.onCloseError} />
            </React.Fragment>

        );
    }
}
export default Root;