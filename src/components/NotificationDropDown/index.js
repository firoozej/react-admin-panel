import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { AppHeaderDropdown } from '@coreui/react';
import Loading from '../Loading';
import withError from '../withError';


export const USER_NOTIFICATIONS = gql`
{
    userNotifications {
        id
        text
    }
}
`;

const DELETE_MUTATION = gql`
  mutation deleteUserNotification($id: String!) {
    deleteUserNotification(id:$id) {
      id
    }
  }
`;

class NotificationDropDown extends Component {
    onDelete(deleteMutation, id) {
        deleteMutation({
            variables: {
                id
            }
        });
    }
    renderDropDownNotifications(userNotifications) {
        return (
            userNotifications.map(notification => (

                <DropdownItem key={notification.id}>

                    <div className='d-flex'>
                        <div style={{flexGrow: 1}}>
                            {notification.text}
                        </div>
                        <div className='pl-1'>
                            <Mutation
                                mutation={DELETE_MUTATION}
                                refetchQueries={() => [{ query: USER_NOTIFICATIONS }]}
                                onError={this.props.onError}>
                                {(deleteMutation, { loading }) => (
                                    <React.Fragment>
                                        <i className='fa fa-trash text-right'
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                return this.onDelete(deleteMutation, notification.id)
                                            }}> </i>
                                        {loading ? <Loading button /> : ''}
                                    </React.Fragment>
                                )}
                            </Mutation>
                        </div>
                    </div>

                </DropdownItem>

            ))
        );
    }
    render() {
        return (
            <AppHeaderDropdown direction='down'>
                <Query
                    query={USER_NOTIFICATIONS}
                    pollInterval={5000}
                >
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        const userNotifications = data.userNotifications;
                        return (
                            <React.Fragment>
                                <DropdownToggle nav>
                                    <i className='icon-bell'></i>
                                    <Badge pill color='danger'>
                                        {!loading && !error &&  userNotifications.length ? userNotifications.length : null}
                                    </Badge>
                                </DropdownToggle>
                                <DropdownMenu right style={{ right: 'auto' }}>
                                    <DropdownItem header tag='div' className='text-center'><strong>Notifications</strong></DropdownItem>
                                    {!loading && !error ?
                                        this.renderDropDownNotifications(userNotifications)
                                        : null
                                    }
                                </DropdownMenu>
                            </React.Fragment>
                        );

                    }}
                </Query>

            </AppHeaderDropdown>
        );
    }

}
export default withError(NotificationDropDown);