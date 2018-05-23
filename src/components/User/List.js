import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {CardBody, CardHeader} from 'reactstrap';
import Loading from '../Loading';
import {getUsersQuery} from '../../queries';
import PaginatedTable from '../PaginatedTable';
import withError from '../withError';
import Error from '../Error';
import withBox from '../withBox';

const DELETE_MUTATION = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id:$id) {
      id
      name
    }
  }
`;

class List extends Component {
    onDelete(deleteMutation, id) {
        deleteMutation({
            variables: {
                id
            }
        });
    }

    renderList(data) {
        return (
                <React.Fragment>
                    <PaginatedTable
                        data={data.users}
                        headers={['Name']}
                        keys={['name']}
                        route='user'
                        onDelete={this.onDelete}
                        deleteMutation={DELETE_MUTATION}
                        listQuery={getUsersQuery}
                    />
                    <Link to='/user/create'
                          className='btn btn-primary btn-square'>Add</Link>
                </React.Fragment>
           );
    }

    render() {
        return (
            <React.Fragment>
                <CardHeader>
                    <i className='fa fa-align-justify'></i> Users
                </CardHeader>
                <CardBody>
                    <Query
                        query={getUsersQuery}>
                        {({loading, error, data}) => {
                            if (loading) return <Loading/>;
                            if (error) return <Error error={error}/>;
                            return this.renderList(data);
                        }}
                    </Query>
                </CardBody>
            </React.Fragment>
        );
    }
}

export default withError(withBox(List));