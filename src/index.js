import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import {Modal, ModalBody, ModalFooter, ModalHeader, Button} from 'reactstrap';
import Client from './client';
import App from './components/App';
import withAuth from './components/withAuth';
import Login from './components/Login/Login';
import ErrorContext from './context/error';


class Root extends React.Component {
    constructor() {
        super();
        let error;
        this.onError = (Error) => {
            if (Error.networkError) {
                error = Error.networkError.bodyText;
            }
            if(Error.graphQLErrors.length) {
                error = Error.graphQLErrors.reduce(
                    (accumulator, currentValue) => accumulator + currentValue.message
                    , '');
            }
            this.setState({
                modal: true,
                message: error
            });
        };
        this.state = {
            modal: false,
            message: '',
        };
    }

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
                                <Route path='/login' name='Login' component={Login}/>
                                <Route path='/' name='Home' component={withAuthApp}/>
                            </Switch>
                        </BrowserRouter>
                    </ApolloProvider>
                </ErrorContext.Provider>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader>Error Occurred</ModalHeader>
                    <ModalBody>
                        {this.state.message}
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.onCloseError}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>

        );
    }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
