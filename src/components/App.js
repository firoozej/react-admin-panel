import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Container} from 'reactstrap';
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
    AppSidebarNav,
} from '@coreui/react';

import routes from '../routes';
import navigation from '../_nav';
import FullAside from './FullAside';
import FullFooter from './FullFooter';
import FullHeader from './FullHeader';
import RoleEdit from './Role/Edit';
import RoleList from './Role/List';
import RoleCreate from './Role/Create';
import PermissionEdit from './Permission/Edit';
import PermissionList from './Permission/List';
import PermissionCreate from './Permission/Create';
import Dashboard from './Dashboard';

import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.css';


class App extends Component {
    render() {
        return (
            <div className='app'>
                <AppHeader fixed>
                    <FullHeader/>
                </AppHeader>
                <div className='app-body'>
                    <AppSidebar fixed display='lg'>
                        <AppSidebarHeader/>
                        <AppSidebarForm/>
                        <AppSidebarNav navConfig={navigation} {...this.props} />
                        <AppSidebarFooter/>
                        <AppSidebarMinimizer/>
                    </AppSidebar>
                    <main className='main'>
                        <AppBreadcrumb appRoutes={routes}/>
                        <Container fluid>
                            <Switch>
                                <Route path='/permission/create' component={PermissionCreate}/>
                                <Route path='/permission/edit/:id' component={PermissionEdit}/>
                                <Route path='/permission' component={PermissionList}/>
                                <Route path='/role/create' component={RoleCreate}/>
                                <Route path='/role/edit/:id' component={RoleEdit}/>
                                <Route path='/role' component={RoleList}/>
                                <Route path='/' component={Dashboard}/>
                            </Switch>
                        </Container>
                    </main>
                    <AppAside fixed hidden>
                        <FullAside/>
                    </AppAside>
                </div>
                <AppFooter>
                    <FullFooter/>
                </AppFooter>
            </div>
        );
    }
}

export default App;

