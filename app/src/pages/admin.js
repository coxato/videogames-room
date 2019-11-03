import React from 'react';
// import { withRouter } from 'react-router';

import { Route , Switch, Link } from 'react-router-dom';
// components
import AdminGeneral from "../containers/generalAdmin"; 
import AdminEvents from '../containers/eventosAdmin';
import ConfigCodes from '../containers/codigosConfig';
import CreateCodes from '../containers/createCodes';
import News from '../containers/news';
import CheckPrizeCode from '../containers/checkPrizeCodeAdmin';
import EditAndCreateEvent from '../containers/editAndCreateEvent';
import EditAndCreateNews from '../containers/editAndCreateNews';
import AdminNav from '../components/admin/adminNav'; 
// style
import './styles/adminPage.css';



function AdminPage(){


    return(
            <div className="admin-page-super-container">
                {/* render the admin nav only in admin routes */}
                { window.location.pathname.match(/admin.{2,}/) && <AdminNav /> }
                <div className="admin-content-container">
                	<Switch>                       
                		<Route exact path="/admin/general" component={AdminGeneral} />
        				<Route exact path="/admin/eventos" component={AdminEvents} />
                        <Route exact path="/admin/evento/:id?" component={EditAndCreateEvent} />
                        <Route exact path="/admin/noticias" component={News} />
                        <Route exact path="/admin/noticia/:id?" component={EditAndCreateNews} />
                        <Route exact path="/admin/config-codigos" component={ConfigCodes} />
                        <Route exact path="/admin/crear-codigos" component={CreateCodes} />
                        <Route exact path="/admin/comprobar-codigo" component={CheckPrizeCode} />
                     </Switch>
                </div>
            </div>
            
        
    )
}

export default AdminPage;