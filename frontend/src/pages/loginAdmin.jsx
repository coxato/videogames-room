import React from 'react';
// import { withRouter } from 'react-router';

import { Route , Switch } from 'react-router-dom';
// components
import AdminLoginContainer from '../containers/admin/adminLoginContainer';
// style
// import './styles/adminPage.css';



function LoginAdmin(){


    return(
            <div className="admin-page-super-container">
                <div className="admin-content-container">
                	<Switch>                       
                		<Route exact path="/admin" component={AdminLoginContainer} />
                	 </Switch>
                </div>
            </div>
            
        
    )
}

export default LoginAdmin;