import React from 'react';
import ReactDOM from 'react-dom';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import 'bootstrap-webpack';

import App from './lib/App';

var eventsData =require('json!./events.json');
  ReactDOM.render(
    <App data={eventsData}/>,
    document.getElementById('root')
  );
