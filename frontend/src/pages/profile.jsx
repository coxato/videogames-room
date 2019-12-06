import React from 'react';

import { Route, Switch  } from 'react-router-dom';
// components
import Profile from '../containers/users/profileContainer'; 
// style
// import './styles/adminPage.css';




function ProfilePage(){

    return(
        <Switch>
            <Route exact path="/profile/:id?" component={Profile} />
        </Switch>
    )
}

export default ProfilePage;