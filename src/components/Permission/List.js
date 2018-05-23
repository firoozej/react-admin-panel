import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';
import {CardBody, CardHeader} from 'reactstrap';
import Loading from '../Loading';
import {getPermissionsQuery} from '../../queries';
import PaginatedTable from '../PaginatedTable';
import withError from '../withError';
import Error from '../Error';
import withBox from '../withBox';

const deleteMutation = gql`
  mutation deletePermission($id: String!) {
    deletePermission(id:$id) {
      id
      name
    }
  }
`;

class List extends Component {
    onDelete(deleteRecord, id) {
        deleteRecord({
            variables: {
                id
            }
        });
    }

    renderList(data) {
        return (
                <React.Fragment>
                    <PaginatedTable
                        data={data.permissions}
                        headers={['Name']}
                        keys={['name']}
                        route='permission'
                        onDelete={this.onDelete}
                        deleteMutation={deleteMutation}
                        listQuery={getPermissionsQuery}
                    />
                    <Link to='/permission/create'
                          className='btn btn-primary btn-square'>Add</Link>
                </React.Fragment>
           );
    }

    render() {
        return (
            <React.Fragment>
                <CardHeader>
                    <i className='fa fa-align-justify'></i> Permissions
                </CardHeader>
                <CardBody>
                    <Query
                        query={getPermissionsQuery}>
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