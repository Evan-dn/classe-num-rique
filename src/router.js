import React from 'react';
import history from './history';

// Routes
import { Route, Router, Switch } from 'react-router-dom';

// Components
import Home from './Pages/Home';
import AddStudent from './Pages/AddStudent';

// import Navbar here because i use Link in navbar and must be wrap with router
import NavbarDrawer from '../src/components/Navbar/NavbarDrawer';

const routes = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
      path: '/addStudent',
      exact: true,
      component: AddStudent
    },
]


  export default function Routes() {
    return (
          <Router history={history}>
            <NavbarDrawer/>
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component} 
                />
              ))}
            </Switch>
          </Router>
    );
  }