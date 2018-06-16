import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Loadable from 'react-loadable';
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

import Loading from './Loading';
import routes from '../routes';
import FullAside from './FullAside';
import FullFooter from './FullFooter';
import FullHeader from './FullHeader';

import Dashboard from './Dashboard';
import AppSidebarNav from './AppSidebarNav';

import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.css';

const RoleList = Loadable({
    loader: () => import('./Role/List'),
    loading: Loading,
});

const RoleCreate = Loadable({
    loader: () => import('./Role/Create'),
    loading: Loading,
});

const RoleEdit = Loadable({
    loader: () => import('./Role/Edit'),
    loading: Loading,
});

const PermissionList = Loadable({
    loader: () => import('./Permission/List'),
    loading: Loading,
});

const PermissionCreate = Loadable({
    loader: () => import('./Permission/Create'),
    loading: Loading,
});

const PermissionEdit = Loadable({
    loader: () => import('./Permission/Edit'),
    loading: Loading,
});

const UserList = Loadable({
    loader: () => import('./User/List'),
    loading: Loading,
});

const UserCreate = Loadable({
    loader: () => import('./User/Create'),
    loading: Loading,
});

const UserEdit = Loadable({
    loader: () => import('./User/Edit'),
    loading: Loading,
});

const ContentCategoryList = Loadable({
    loader: () => import('./ContentCategory/List'),
    loading: Loading,
});

const ContentCategoryCreate = Loadable({
    loader: () => import('./ContentCategory/Create'),
    loading: Loading,
});

const ContentCategoryEdit = Loadable({
    loader: () => import('./ContentCategory/Edit'),
    loading: Loading,
});

const ContentItemList = Loadable({
    loader: () => import('./ContentItem/List'),
    loading: Loading,
});

const ContentItemCreate = Loadable({
    loader: () => import('./ContentItem/Create'),
    loading: Loading,
});

const ContentItemEdit = Loadable({
    loader: () => import('./ContentItem/Edit'),
    loading: Loading,
});

const NotificationList = Loadable({
    loader: () => import('./Notification/List'),
    loading: Loading,
});

const NotificationCreate = Loadable({
    loader: () => import('./Notification/Create'),
    loading: Loading,
});

const NotificationEdit = Loadable({
    loader: () => import('./Notification/Edit'),
    loading: Loading,
});

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
                                <Route path='/notification/create' component={NotificationCreate} />
                                <Route path='/notification/edit/:id' component={NotificationEdit} />
                                <Route path='/notification' component={NotificationList} />
                                <Route path='/item/create' component={ContentItemCreate} />
                                <Route path='/item/edit/:id' component={ContentItemEdit} />
                                <Route path='/item' component={ContentItemList} />
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

