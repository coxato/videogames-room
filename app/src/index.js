import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// components
import AppDOM from './app/app';
// style
import '../public/bulma.css';

function renderIt(){
    hydrate(<AppDOM />, document.getElementById("root") );
}

renderIt()
if (module.hot) {
  module.hot.accept('./app/app', () => {
    renderIt()
  })
}