import React from 'react';

import { Route, Switch  } from 'react-router-dom';
// components
import Nav from '../components/commons/nav';
import Footer from '../components/commons/footer';
// import Landing from '../containers/landing'; 
// containers
import Home from '../containers/homeContainer';
import Eventos from '../containers/eventos';
import Juegos from '../containers/juegos';
// style
// import './styles/landingPage.css';


function LandingPage(){
	return(
        <div className="landing-page-super-container">
            {/* render the landing nav only in landing routes */}
            <div className="landing-content-container">
            	<Switch>                       
            		<Route exact path="/" component={Home} />
    				<Route exact path="/eventos" component={Eventos} />
                    <Route exact path="/juegos" component={Juegos} />
                    {/* <Route exact path="/profile/:id" component={CreateCodes} />  */}
            	 </Switch>
            </div>
        </div>
    )
}

export default LandingPage;