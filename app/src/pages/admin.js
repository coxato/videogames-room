import React from 'react';
// import { withRouter } from 'react-router';

import { BrowserRouter, Route , Switch, Link } from 'react-router-dom';
// components
import AdminGeneral from "../containers/generalAdmin"; 
import AdminEvents from '../containers/eventosAdmin';
import ConfigCodes from '../containers/codigosConfig';
import CreateCodes from '../containers/createCodes';
import EditAndCreateEvent from '../containers/editAndCreateEvent';
import AdminNav from '../components/admin/adminNav'; 
// style
import './styles/adminPage.css';



function AdminPage(){
    return(
        <div className="admin-page-super-container">
            {/* render the admin nav only in admin routes */}
            { window.location.pathname.includes("admin") && <AdminNav /> }
            <div className="admin-content-container">
            	<Switch>                       
            		<Route exact path="/admin/general" component={AdminGeneral} />
    				<Route exact path="/admin/eventos" component={AdminEvents} />
                    <Route exact path="/admin/evento/:id?" component={EditAndCreateEvent} />
                    <Route exact path="/admin/config-codigos" component={ConfigCodes} />
                    <Route exact path="/admin/crear-codigos" component={CreateCodes} />
                
            	 </Switch>
            </div>		
        </div>
    )
}

export default AdminPage;