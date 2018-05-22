import React,{Component} from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';

class AppPagination extends Component{
    constructor(props) {
        super(props);
        this.state = {
            active: 1,
            pageCount: this.props.pageCount
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.pageCount !== prevState.pageCount) {
            return {
                active: 1,
                pageCount: nextProps.pageCount
            }
        }
        else {
            return null;
        }
    }
    onPageChange(page){
        this.setState({
            active: page
        });
        this.props.onPageChange(page);
    }
    onPrevious = () => {
        const currentPage = this.state.active;
        if(currentPage === 1) return;
        this.setState({
            active: currentPage - 1
        });
        this.props.onPageChange(currentPage - 1);
    };
    onNext = () => {
        const currentPage = this.state.active;
        if(currentPage === this.state.pageCount) return;
        this.setState({
            active: currentPage + 1
        });
        this.props.onPageChange(currentPage + 1);
    };
    renderPaginationItems() {
        let paginationItems = [];
        for(let i = 1; i <= this.state.pageCount; i++) {
            paginationItems.push(
                this.state.active === i ?
                <PaginationItem active key={i}>
                    <PaginationLink tag='button' onClick={this.onPageChange.bind(this, i)}>{i}</PaginationLink>
                </PaginationItem> :
                <PaginationItem key={i}>
                    <PaginationLink tag='button' onClick={this.onPageChange.bind(this, i)}>{i}</PaginationLink>
                </PaginationItem>
            );
        }
        return paginationItems;
    };
    render() {
        if(this.state.pageCount > 1) {
            return(
                <Pagination>
                    <PaginationItem>
                        <PaginationLink previous tag='button' onClick ={this.onPrevious} />
                    </PaginationItem>
                    {this.renderPaginationItems()}
                    <PaginationItem>
                        <PaginationLink next tag='button' onClick = {this.onNext} />
                    </PaginationItem>
                </Pagination>
            );
        }
        else {
            return null;
        }

    }
}
export default AppPagination;

AppPagination.propTypes = {
    pageCount: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};