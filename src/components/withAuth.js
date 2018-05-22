import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import Loading from './Loading';
import Redirect from "react-router-dom/es/Redirect";

const userQuery = gql`
{
    user {
      access_token
    }
}
`;

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        render() {
            const {loading, error} = this.props.data;
            if (loading) return <Loading />;
            if(error) {
                return <Redirect to='/login' />
            }
            return <WrappedComponent {...this.props} />;
        }
    }
    return graphql(userQuery)(RequireAuth);
}

