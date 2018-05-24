import React, {Component} from 'react';
import {Query} from 'react-apollo';
import {Link} from 'react-router-dom';
import {CardBody, CardHeader} from 'reactstrap';
import Loading from './Loading';
import PaginatedTable from './PaginatedTable';
import withError from './withError';
import Error from './Error';
import withBox from './withBox';


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
                        data={data[Object.keys(data)[0]]}
                        headers={['Name']}
                        keys={['name']}
                        route='user'
                        onDelete={this.onDelete}
                        deleteMutation={this.props.DELETE_MUTATION}
                        listQuery={this.props.LIST_QUERY}
                    />
                    <Link to={`/${this.props.route}/create`}
                          className='btn btn-primary btn-square'>Add</Link>
                </React.Fragment>
           );
    }

    render() {
        return (
            <React.Fragment>
                <CardHeader>
                    <i className='fa fa-align-justify'></i> {this.props.title}
                </CardHeader>
                <CardBody>
                    <Query
                        query={this.props.LIST_QUERY}>
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