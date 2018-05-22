import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import Mutation from 'react-apollo/Mutation';
import withError from './withError';
import Loading from './Loading';

class AppTable extends Component {
    render() {
        return (
            <Table responsive striped key={1}>
                <thead>
                <tr>
                    {this.props.headers.map(header => <th key={header}>{header}</th>)}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {this.props.data.map(item => (
                    <tr key={item.id}>
                        {
                            this.props.keys.map((key, index) => {
                                return (
                                    <td key={index}>
                                        {index === 0
                                            ? <Link to={`/${this.props.route}/edit/${item.id}`}>{item[key]}</Link>
                                            : item[key]
                                        }
                                    </td>
                                )
                            })
                        }
                        <td width='100px'>
                            <Mutation
                                mutation={this.props.deleteMutation}
                                refetchQueries={() => [{query: this.props.listQuery}]}
                                onError={this.props.onError}>
                                {(deleteRecord, {loading}) => (
                                    <React.Fragment>
                                        <i className='fa fa-trash'
                                           onClick={() => this.props.onDelete(deleteRecord, item.id)}> </i>
                                        {loading ? <Loading button/> : ''}
                                    </React.Fragment>
                                )
                                }
                            </Mutation>
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
        );
    }
}

export default withError(AppTable);

AppTable.propTypes = {
    headers: PropTypes.array.isRequired,
    keys: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    route: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired
};