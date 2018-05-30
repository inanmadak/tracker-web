import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
// import App from './App';
import Root from './Root';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';


const store = createStore()
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
