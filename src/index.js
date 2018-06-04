import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
