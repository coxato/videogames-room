import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// components
import AppDOM from './app/app';
// style
import './bulma.css';
// render in browser
render(<AppDOM />, document.getElementById("root") );
