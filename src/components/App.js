import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
    AppAside,
    AppBreadcrumb,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
} from '@coreui/react';

import routes from '../routes';
import FullAside from './FullAside';
import FullFooter from './FullFooter';
import FullHeader from './FullHeader';
import RoleEdit from './Role/Edit';
import RoleList from './Role/List';
import RoleCreate from './Role/Create';
import PermissionEdit from './Permission/Edit';
import PermissionList from './Permission/List';
import PermissionCreate from './Permission/Create';
import UserEdit from './User/Edit';
import UserList from './User/List';
import UserCreate from './User/Create';
import ContentCategoryEdit from './ContentCategory/Edit';
import ContentCategoryList from './ContentCategory/List';
import ContentCategoryCreate from './ContentCategory/Create';
import Dashboard from './Dashboard';
import AppSidebarNav from './AppSidebarNav';

import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.css';


class App extends Component {
    render() {
        return (
            <div className='app'>
                <AppHeader fixed>
                    <FullHeader />
                </AppHeader>
                <div className='app-body'>
                    <AppSidebar fixed display='lg'>
                        <AppSidebarHeader />
                        <AppSidebarForm />
                        <AppSidebarNav {...this.props} />
                        <AppSidebarFooter />
                        <AppSidebarMinimizer />
                    </AppSidebar>
                    <main className='main'>
                        <AppBreadcrumb appRoutes={routes} />
                        <Container fluid>
                            <Switch>
                                <Route path='/category/create' component={ContentCategoryCreate} />
                                <Route path='/category/edit/:id' component={ContentCategoryEdit} />
                                <Route path='/category' component={ContentCategoryList} />
                                <Route path='/user/create' component={UserCreate} />
                                <Route path='/user/edit/:id' component={UserEdit} />
                                <Route path='/user' component={UserList} />
                                <Route path='/permission/create' component={PermissionCreate} />
                                <Route path='/permission/edit/:id' component={PermissionEdit} />
                                <Route path='/permission' component={PermissionList} />
                                <Route path='/role/create' component={RoleCreate} />
                                <Route path='/role/edit/:id' component={RoleEdit} />
                                <Route path='/role' component={RoleList} />
                                <Route path='/' component={Dashboard} />
                            </Switch>
                        </Container>
                    </main>
                    <AppAside fixed hidden>
                        <FullAside />
                    </AppAside>
                </div>
                <AppFooter>
                    <FullFooter />
                </AppFooter>
            </div>
        );
    }
}

export default App;

