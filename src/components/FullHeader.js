import React, { Component } from 'react';
import { Badge, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import HeaderDropDownMenu from './HeaderDropDown/HeaderDropDownMenu';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class FullHeader extends Component {
  logout() {
      this.props.mutate();
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className='d-lg-none' display='md' mobile />
        <AppNavbarBrand
          full={{ src: process.env.PUBLIC_URL + '/assets/img/brand/logo.svg', width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: process.env.PUBLIC_URL + '/assets/img/brand/sygnet.svg', width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className='d-md-down-none' display='lg' />

        <Nav className='d-md-down-none' navbar>
          <NavItem className='px-3'>
            <NavLink href='/'>Dashboard</NavLink>
          </NavItem>
          <NavItem className='px-3'>
            <NavLink href='#'>Users</NavLink>
          </NavItem>
          <NavItem className='px-3'>
            <NavLink href='#'>Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className='ml-auto' navbar>
          <NavItem className='d-md-down-none'>
            <NavLink href='#'><i className='icon-bell'></i><Badge pill color='danger'>5</Badge></NavLink>
          </NavItem>
          <NavItem className='d-md-down-none'>
            <NavLink href='#'><i className='icon-list'></i></NavLink>
          </NavItem>
          <NavItem className='d-md-down-none'>
            <NavLink href='#'><i className='icon-location-pin'></i></NavLink>
          </NavItem>
          <HeaderDropDownMenu/>
        </Nav>
        <AppAsideToggler className='d-md-down-none' />
        {/*<AppAsideToggler className='d-lg-none' mobile />*/}
      </React.Fragment>
    );
  }
}

FullHeader.propTypes = propTypes;
FullHeader.defaultProps = defaultProps;

export default FullHeader;
