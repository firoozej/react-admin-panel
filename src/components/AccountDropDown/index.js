import React,{Component} from 'react';
import AccountDropDown from './AccountDropDown';
import gql from 'graphql-tag';
import withApollo from "react-apollo/withApollo";
import withRouter from "react-router-dom/es/withRouter";

const logoutQuery = gql`
query {
    logout {
        access_token
    }
}
`;

class AccountDropDownMenu extends Component{
    onLogOut() {
        this.props.client.query({
            query: logoutQuery
        }).then(() => {
            this.props.history.push('/login');
        }).catch(() => {
            document.cookie = 'refreshToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            this.props.history.push('/login');
        })
    }
    render() {
       return <AccountDropDown onLogout={this.onLogOut.bind(this)} />;
    }
}
export default withApollo(withRouter(AccountDropDownMenu));