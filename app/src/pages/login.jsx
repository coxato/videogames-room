import React from 'react';

import { Route, Switch  } from 'react-router-dom';
// components
import Login from '../containers/users/loginFormContainer'; 
// style
// import './styles/adminPage.css';




function LoginPage(){

    return(
        <Switch>
            <Route exact path="/login" component={Login} />
        </Switch>
    )
}

export default LoginPage;