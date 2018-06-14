import React from 'react';
import {Badge, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {AppHeaderDropdown} from '@coreui/react';

export default (props) => (
    <AppHeaderDropdown direction='down'>
        <DropdownToggle nav>
            <img src={'/assets/img/avatars/6.jpg'} className='img-avatar' alt='admin@bootstrapmaster.com'/>
        </DropdownToggle>
        <DropdownMenu right style={{right: 'auto'}}>
            <DropdownItem header tag='div' className='text-center'><strong>Account</strong></DropdownItem>
            <DropdownItem><i className='fa fa-envelope-o'></i> Messages<Badge color='success'>42</Badge></DropdownItem>
            <DropdownItem header tag='div' className='text-center'><strong>Settings</strong></DropdownItem>
            <DropdownItem><i className='fa fa-user'></i> Profile</DropdownItem>
            <DropdownItem divider/>
            <DropdownItem onClick={props.onLogout}><i className='fa fa-lock'></i>Logout</DropdownItem>
        </DropdownMenu>
    </AppHeaderDropdown>
);