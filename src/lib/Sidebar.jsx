import React from 'react';
import ReactDOM from 'react-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import 'bootstrap-webpack';

import Presets from './Presets';
import Keywords from './Keywords';

export default class Sidebar extends React.Component{
  render (){
    if (this.props.windowHeight > 400){
    var listHeight = this.props.windowHeight/2 - 150;
  } else{
    var listHeight = 100;
  }
    return (
      <div>
      <Keywords listHeight={listHeight}
        onSendYaxis={this.props.onSendYaxis}
        onSendTimeline = {this.props.onSendTimeline}/>
      <Presets listHeight={listHeight}/>
      <Button>
        Clear
      </Button>
    </div>
    );
  }
}
