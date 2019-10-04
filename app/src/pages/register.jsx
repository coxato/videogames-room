import React from 'react';

import { Route, Switch  } from 'react-router-dom';
// components
import Register from '../containers/registerFormContainer'; 
// style
// import './styles/adminPage.css';




function RegisterPage(){

    return(
        <Switch>
            <Route exact path="/register" component={Register} />
        </Switch>
    )
}

export default RegisterPage;