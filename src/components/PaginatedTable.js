import React, {Component} from 'react';
import Table from './Table';
import Pagination from './Pagination';
import PropTypes from "prop-types";

class PaginatedTable extends Component {
    state = {
        selectedPage: 1
    };

    static getDerivedStateFromProps() {
        return {
            selectedPage: 1
        }
    }

    onPageChange = (page) => {
        this.setState({
            selectedPage: page
        });
    };

    render() {
        const start = (this.state.selectedPage - 1) * this.props.perPage;
        const end = this.state.selectedPage * this.props.perPage;
        const data = this.props.data.slice(start, end);
        return (<React.Fragment>
            <Table
                data={data}
                headers={this.props.headers}
                keys={this.props.keys}
                route={this.props.route}
                onDelete={this.props.onDelete}
                DELETE_MUTATION={this.props.DELETE_MUTATION}
                LIST_QUERY={this.props.LIST_QUERY}
                deletable={this.props.deletable}
            />,
            <Pagination
                pageCount={Math.ceil(this.props.data.length / this.props.perPage)}
                onPageChange={this.onPageChange}
            />
        </React.Fragment>);
    }
}

export default PaginatedTable;

PaginatedTable.defaultProps = {
    perPage: 30
};

PaginatedTable.propTypes = {
    headers: PropTypes.array.isRequired,
    keys: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    route: PropTypes.string.isRequired,
    onDelete: PropTypes.func.isRequired,
    perPage: PropTypes.number,
};