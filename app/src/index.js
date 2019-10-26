import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// components
import AppDOM from './app/app';
// style
import '../public/bulma.css';
// render in browser
hydrate(<AppDOM />, document.getElementById("root") );
