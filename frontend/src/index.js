import React from 'react';
import { render } from 'react-dom';
// components
import App from './pages/admin';
// style
import './bulma.min.css';


function renderIt(){
    render(<App />, document.getElementById("root") );
}

renderIt()
if (module.hot) {
  module.hot.accept('./pages/admin', () => {
    renderIt()
  })
}