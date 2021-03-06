import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'jquery/dist/jquery.min.js';
// import 'jquery/dist/jquery.slim.min.js';
// import 'popper.js/dist/popper-utils.min.js'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'material-design-iconic-font/dist/css/material-design-iconic-font.min.css';
// import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
